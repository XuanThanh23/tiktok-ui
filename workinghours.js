import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { X, PlusCircle } from "lucide-react";

import { CopyPopover } from "@/pages/config-mer/components/copy-popover";
import { TimeRangePicker } from "@/pages/config-mer/components/time-range";
import { ConfirmCloseDialog } from "@/components/ConfirmCloseDialog";
import { FloatingAlert } from "@/components/ui/floating-alert";

/* ======================================================
   TYPES
====================================================== */

type TimeRange = {
  start: string;
  end: string;
};

type WorkingDay = {
  day: string;
  is_closed: boolean;
  ranges: TimeRange[];
};

type AlertState = {
  visible: boolean;
  variant: "success" | "error";
  title: string;
  description: string;
};

/* ======================================================
   CONSTANTS
====================================================== */

const DAYS = [
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ bảy",
  "Chủ Nhật",
];

const DEFAULT_RANGE: TimeRange = {
  start: "08:00",
  end: "20:00",
};

const MAX_RANGES = 5;

/* ======================================================
   HELPERS
====================================================== */

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

const normalizeTime = (value?: string | null) => {
  if (!value) return "";
  return value.slice(0, 5);
};

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const addMinutes = (time: string, minutes: number) => {
  const total = Math.min(toMinutes(time) + minutes, 1439);

  const h = Math.floor(total / 60);
  const m = total % 60;

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

const createDefaultDays = (): WorkingDay[] =>
  DAYS.map((day) => ({
    day,
    is_closed: false,
    ranges: [clone(DEFAULT_RANGE)],
  }));

const mapApiToUI = (
  openTime?: string | null,
  closeTime?: string | null,
): WorkingDay[] => {
  const start = normalizeTime(openTime) || DEFAULT_RANGE.start;
  const end = normalizeTime(closeTime) || DEFAULT_RANGE.end;

  return DAYS.map((day) => ({
    day,
    is_closed: false,
    ranges: [{ start, end }],
  }));
};

const validateRanges = (ranges: TimeRange[]) => {
  const sorted = [...ranges]
    .map((item) => ({
      ...item,
      startMin: toMinutes(item.start),
      endMin: toMinutes(item.end),
    }))
    .sort((a, b) => a.startMin - b.startMin);

  for (let i = 0; i < sorted.length; i++) {
    const current = sorted[i];

    if (current.startMin >= current.endMin) {
      return "Giờ bắt đầu phải nhỏ hơn giờ kết thúc";
    }

    if (i > 0 && current.startMin < sorted[i - 1].endMin) {
      return "Các khung giờ bị chồng lấn nhau";
    }
  }

  return null;
};

const validateAllDays = (days: WorkingDay[]) => {
  for (const day of days) {
    if (day.is_closed) continue;

    const error = validateRanges(day.ranges);

    if (error) {
      return `${day.day}: ${error}`;
    }
  }

  return null;
};

/* ======================================================
   COMPONENT
====================================================== */

export default function ClinicWorkingHours() {
  const apiURL = import.meta.env.VITE_API_URL;

  const [data, setData] = useState<WorkingDay[]>(createDefaultDays());

  const [originalData, setOriginalData] =
    useState<WorkingDay[]>(createDefaultDays());

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [alert, setAlert] = useState<AlertState>({
    visible: false,
    variant: "success",
    title: "",
    description: "",
  });

  const showAlert = (
    variant: "success" | "error",
    title: string,
    description = "",
  ) => {
    setAlert({
      visible: true,
      variant,
      title,
      description,
    });
  };

  const isDirty = useMemo(
    () => JSON.stringify(data) !== JSON.stringify(originalData),
    [data, originalData],
  );

  /* ======================================================
     FETCH DATA
     GET {apiURL}/api/clinics
  ====================================================== */

  const fetchClinic = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${apiURL}/api/clinics`, {
        withCredentials: true,
      });

      const clinic = response.data?.data?.[0];

      if (!clinic) {
        throw new Error("Không có dữ liệu clinic");
      }

      const mapped = mapApiToUI(clinic.openTime, clinic.closeTime);

      setData(mapped);
      setOriginalData(clone(mapped));
    } catch {
      showAlert("error", "Lỗi", "Không thể tải dữ liệu giờ làm việc");
    } finally {
      setLoading(false);
    }
  }, [apiURL]);

  useEffect(() => {
    fetchClinic();
  }, [fetchClinic]);

  /* ======================================================
     UPDATE HELPERS
  ====================================================== */

  const updateDay = (
    dayIndex: number,
    updater: (day: WorkingDay) => WorkingDay,
  ) => {
    setData((prev) =>
      prev.map((item, index) => (index === dayIndex ? updater(item) : item)),
    );
  };

  const toggleDay = (dayIndex: number) => {
    updateDay(dayIndex, (day) => ({
      ...day,
      is_closed: !day.is_closed,
    }));
  };

  const addRange = (dayIndex: number) => {
    updateDay(dayIndex, (day) => {
      if (day.ranges.length >= MAX_RANGES) {
        showAlert("error", "Lỗi", "Đã đạt tối đa số khung giờ");
        return day;
      }

      const last = day.ranges[day.ranges.length - 1];

      if (last.end === "23:59") {
        showAlert("error", "Lỗi", "Không thể thêm sau 23:59");
        return day;
      }

      const start = addMinutes(last.end, 1);
      const end = addMinutes(start, 119);

      return {
        ...day,
        ranges: [...day.ranges, { start, end }],
      };
    });
  };

  const removeRange = (dayIndex: number, rangeIndex: number) => {
    updateDay(dayIndex, (day) => {
      const next = day.ranges.filter((_, i) => i !== rangeIndex);

      return {
        ...day,
        ranges:
          next.length > 0
            ? next
            : [
                {
                  start: "09:00",
                  end: "12:00",
                },
              ],
      };
    });
  };

  const changeRange = (
    dayIndex: number,
    rangeIndex: number,
    value: TimeRange,
  ) => {
    updateDay(dayIndex, (day) => {
      const next = [...day.ranges];
      next[rangeIndex] = value;

      return {
        ...day,
        ranges: next,
      };
    });
  };

  const copyDay = (fromIndex: number, toIndexes: number[]) => {
    const source = clone(data[fromIndex].ranges);

    setData((prev) =>
      prev.map((item, index) =>
        toIndexes.includes(index)
          ? {
              ...item,
              is_closed: false,
              ranges: clone(source),
            }
          : item,
      ),
    );
  };

  /* ======================================================
     SAVE
     PATCH {apiURL}/api/clinics/me
  ====================================================== */

  const handleSave = async () => {
    const error = validateAllDays(data);

    if (error) {
      showAlert("error", "Lỗi", error);
      return;
    }

    try {
      setSaving(true);

      const firstOpenDay = data.find((item) => !item.is_closed);

      if (!firstOpenDay) {
        showAlert("error", "Lỗi", "Phải có ít nhất 1 ngày làm việc");
        return;
      }

      const firstSlot = firstOpenDay.ranges[0];

      const lastSlot = firstOpenDay.ranges[firstOpenDay.ranges.length - 1];

      const formData = new FormData();

      formData.append("openTime", firstSlot.start);

      formData.append("closeTime", lastSlot.end);

      await axios.patch(`${apiURL}/api/clinics/me`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchClinic();

      showAlert("success", "Thành công", "Cập nhật giờ làm việc thành công");
    } catch {
      showAlert("error", "Lỗi", "Không thể cập nhật dữ liệu");
    } finally {
      setSaving(false);
    }
  };

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <TooltipProvider>
      <div className="bg-white rounded-2xl">
        <div className="p-6 space-y-8">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#111111]">
              Giờ làm việc chung
            </h2>

            <p className="text-[#888888] text-sm font-medium">
              Cấu hình giờ làm việc theo giao diện cũ
            </p>
          </div>

          {loading ? (
            <div className="text-sm text-gray-500">Đang tải dữ liệu...</div>
          ) : (
            <div className="space-y-1">
              {data.map((item, dayIndex) => (
                <div
                  key={item.day}
                  className="flex items-start gap-2 group pb-5"
                >
                  {/* Switch */}
                  <div className="flex items-center justify-center w-14 shrink-0 pt-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Switch
                            checked={!item.is_closed}
                            onCheckedChange={() => toggleDay(dayIndex)}
                            className="data-[state=checked]:bg-[#1374C1]"
                          />
                        </div>
                      </TooltipTrigger>

                      <TooltipContent>
                        <p>Bật/tắt ngày làm việc</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Body */}
                  <div
                    className={`flex flex-col lg:flex-row flex-1 items-start p-[8px_12px_8px_20px] gap-8 rounded-[12px] ${
                      item.is_closed ? "bg-[#F4F4F5]" : "bg-white"
                    }`}
                  >
                    <div className="w-full lg:w-24 shrink-0 lg:h-9 flex items-center">
                      <span className="text-base font-bold text-[#222222]">
                        {item.day}
                      </span>
                    </div>

                    <div
                      className={`flex flex-col gap-2 flex-1 w-full ${
                        item.is_closed
                          ? "pointer-events-none opacity-50 grayscale"
                          : ""
                      }`}
                    >
                      {item.ranges.map((range, rangeIndex) => (
                        <div
                          key={rangeIndex}
                          className="grid grid-cols-1 sm:grid-cols-[1fr_auto] md:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-4 sm:gap-6 w-full items-center"
                        >
                          <TimeRangePicker
                            start={range.start}
                            end={range.end}
                            minStart={
                              rangeIndex > 0
                                ? item.ranges[rangeIndex - 1].end
                                : undefined
                            }
                            maxEnd={
                              rangeIndex < item.ranges.length - 1
                                ? item.ranges[rangeIndex + 1].start
                                : undefined
                            }
                            onChange={(val: TimeRange) =>
                              changeRange(dayIndex, rangeIndex, val)
                            }
                            onError={(msg) => showAlert("error", "Lỗi", msg)}
                          />

                          <div className="flex items-center justify-end gap-3 sm:gap-4 h-9">
                            <div className="flex-1 flex justify-end">
                              {rangeIndex === 0 && (
                                <button
                                  onClick={() => addRange(dayIndex)}
                                  className="flex items-center gap-2 text-[#3B82F6] hover:text-[#0f5da1]"
                                >
                                  <PlusCircle className="w-6 h-6" />
                                  <span className="text-sm font-bold">
                                    Thêm khung giờ
                                  </span>
                                </button>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                disabled={item.ranges.length <= 1}
                                onClick={() =>
                                  removeRange(dayIndex, rangeIndex)
                                }
                                className={`p-1.5 rounded-lg ${
                                  item.ranges.length > 1
                                    ? "text-[#111111]"
                                    : "text-gray-400 opacity-40"
                                }`}
                              >
                                <X className="w-5 h-5" />
                              </button>

                              <div className="w-8 flex justify-center">
                                {rangeIndex === 0 && (
                                  <CopyPopover
                                    fromIndex={dayIndex}
                                    onApply={(indexes) =>
                                      copyDay(dayIndex, indexes)
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 pt-0">
          <Button
            variant="outline"
            disabled={!isDirty}
            onClick={() => setConfirmOpen(true)}
          >
            Hủy
          </Button>

          <Button
            disabled={!isDirty || saving || loading}
            onClick={handleSave}
            className="bg-[#0284C7] hover:bg-[#0369A1]"
          >
            {saving ? "Đang cập nhật..." : "Cập nhật"}
          </Button>
        </div>
      </div>

      {/* Confirm */}
      <ConfirmCloseDialog
        isOpen={confirmOpen}
        dayName=""
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setData(clone(originalData));
          setConfirmOpen(false);

          showAlert("success", "Thành công", "Đã hoàn tác thay đổi");
        }}
        title="Hủy thay đổi?"
        content="Tất cả thay đổi chưa lưu sẽ bị mất."
      />

      {/* Alert */}
      <FloatingAlert
        visible={alert.visible}
        variant={alert.variant}
        title={alert.title}
        description={alert.description}
        onDismiss={() =>
          setAlert((prev) => ({
            ...prev,
            visible: false,
          }))
        }
      />
    </TooltipProvider>
  );
}
