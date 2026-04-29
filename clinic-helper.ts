import type { Clinic, Address } from '@/types/clinic';

/**
 * Format full address from address components
 */
export const formatFullAddress = (address: Address): string => {
    const parts = [
        address.DETAIL,
        address.WARDS.WARDS_NAME,
        address.DISTRICT.DISTRICT_NAME,
        address.PROVINCE.PROVINCE_NAME,
    ];
    return parts.filter(Boolean).join(', ');
};

/**
 * Format clinic status to Vietnamese
 */
export const formatClinicStatus = (status: Clinic['status']): { label: string; color: string } => {
    const statusMap = {
        pending: { label: 'Chờ duyệt', color: 'bg-yellow-100 text-yellow-800' },
        active: { label: 'Hoạt động', color: 'bg-green-100 text-green-800' },
        inactive: { label: 'Không hoạt động', color: 'bg-gray-100 text-gray-800' },
    };
    return statusMap[status] || statusMap.pending;
};

/**
 * Format clinic opening hours
 */
export const formatClinicHours = (openTime: string | null, closeTime: string | null): string => {
    if (!openTime || !closeTime) return 'Chưa cập nhật';
    return `${openTime} - ${closeTime}`;
};

/**
 * Format user document status
 */
export const formatDocumentStatus = (status: string): { label: string; color: string } => {
    const statusMap = {
        pending_verify: {
            label: 'Chờ xác minh',
            color: 'bg-blue-100 text-blue-800',
        },
        verified: { label: 'Đã xác minh', color: 'bg-green-100 text-green-800' },
        rejected: { label: 'Bị từ chối', color: 'bg-red-100 text-red-800' },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pending_verify;
};

/**
 * Get clinic display info
 */
export const getClinicDisplayInfo = (clinic: Clinic) => {
    return {
        fullAddress: formatFullAddress(clinic.address),
        status: formatClinicStatus(clinic.status),
        hours: formatClinicHours(clinic.openTime, clinic.closeTime),
        documentVerified: clinic.userDocuments.some((d) => d.status === 'verified'),
        mediaCount: clinic.clinicMedias.length,
    };
};

/**
 * Validate clinic data completeness
 */
export const validateClinicCompleteness = (
    clinic: Clinic,
): {
    isComplete: boolean;
    missingFields: string[];
} => {
    const missingFields: string[] = [];

    if (!clinic.name) missingFields.push('Tên phòng khám');
    if (!clinic.phone) missingFields.push('Số điện thoại');
    if (!clinic.email) missingFields.push('Email');
    if (!clinic.businessRegistrationNumber) missingFields.push('Số đăng ký kinh doanh');
    if (!clinic.openTime || !clinic.closeTime) missingFields.push('Giờ mở cửa');
    if (!clinic.userDocuments.some((d) => d.status === 'verified')) missingFields.push('Xác minh giấy tờ');

    return {
        isComplete: missingFields.length === 0,
        missingFields,
    };
};

/**
 * Extract clinic basic info for API requests
 */
export const extractClinicBasicInfo = (clinic: Clinic) => {
    return {
        code: clinic.code,
        name: clinic.name,
        phone: clinic.phone,
        email: clinic.email,
        address: clinic.address,
        location: clinic.location,
        openTime: clinic.openTime,
        closeTime: clinic.closeTime,
        description: clinic.description,
    };
};
