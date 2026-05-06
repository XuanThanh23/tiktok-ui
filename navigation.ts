import { Server, LayoutGrid, type LucideIcon, Package, Home, ContactRound, Settings2, Scissors } from 'lucide-react';

export interface NavigationChild {
    title: string;
    url: string;
}

export interface NavigationItem {
    title: string;
    url: string;
    icon: LucideIcon;
    group: string;
    hidden?: boolean;
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
    }[];
}

export interface CliNavigationItem {
    title?: string;
    url?: string;
    icon?: LucideIcon;
    group?: string;
    hidden?: boolean;
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
    }[];
}

export const navigationConfig: NavigationItem[] = [
    {
        title: 'Trang chủ',
        url: '/mer-dashboard',
        icon: Home,
        group: 'Tổng quan',
    },
    {
        title: 'Danh sách lịch hẹn',
        url: '/booking',
        icon: Scissors,
        group: 'Lịch hẹn',
    },
    {
        title: 'Quản lý đơn hàng',
        url: '/orders',
        icon: Package,
        group: 'Đơn hàng',
    },
    {
        title: 'Nhân sự',
        url: '/staff',
        icon: ContactRound,
        group: 'Tổng quan',
        items: [{ title: 'Danh sách nhân sự', url: '/staff' }],
    },
    {
        title: 'Thiết lập',
        url: '/config-merchant',
        icon: Settings2,
        group: 'Thiết lập',
        items: [
            {
                title: 'Danh mục sản phẩm',
                url: '/products',
            },
            {
                title: 'Danh mục dịch vụ',
                url: '/services',
            },
            {
                title: 'Thông tin cơ sở',
                url: '/config-merchant',
            },
        ],
    },
    {
        title: 'Thêm dịch vụ mới',
        url: '/services/create',
        icon: Server,
        group: 'Tổng quan > Dịch vụ',
        hidden: true,
    },
];

export const cliNavigationConfig: CliNavigationItem[] = [
    {
        title: 'Trang chủ',
        url: '/cli-dashboard',
        icon: LayoutGrid,
        group: 'Tổng quan',
    },
    {
        title: 'Danh sách lịch hẹn',
        url: '/cli-booking',
        icon: Scissors,
        group: 'Lịch hẹn',
    },
    {
        title: 'Quản lý đơn hàng',
        url: '/cli-orders',
        icon: Package,
        group: 'Đơn hàng',
    },
    {
        title: 'Lịch hẹn định danh',
        url: '/cli-appointments',
        icon: Server,
        group: 'Tổng quan',
    },
    {
        title: 'Nhân sự',
        url: '/cli-staff',
        icon: ContactRound,
        group: 'Tổng quan',
        items: [{ title: 'Danh sách nhân sự', url: '/cli-staff' }],
    },
    {
        title: 'Thiết lập phòng khám',
        url: '/cli-config',
        icon: Settings2,
        group: 'Cấu hình',
    },
];
