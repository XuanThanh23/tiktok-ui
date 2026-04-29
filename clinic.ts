// Media type
export interface Media {
    id: string;
    createdAt: string;
    updatedAt: string;
}

// Address components
export interface Province {
    PROVINCE_ID: number;
    PROVINCE_CODE: string;
    PROVINCE_NAME: string;
}

export interface District {
    DISTRICT_ID: number;
    DISTRICT_NAME: string;
    PROVINCE_ID: number;
}

export interface Wards {
    WARDS_ID: number;
    WARDS_NAME: string;
    DISTRICT_ID: number;
}

export interface Address {
    PROVINCE: Province;
    DISTRICT: District;
    WARDS: Wards;
    DETAIL: string;
}

// Location coordinates
export interface Location {
    longitude: number;
    latitude: number;
}

// Clinic Media
export interface ClinicMedia {
    id: string;
    createdAt: string;
    updatedAt: string;
    clinicId: string;
    clinic: null;
    mediaId: string;
    media: Media;
}

// User Document
export interface UserDocument {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    frontMediaId: string;
    frontMedia: Media;
    backMediaId: string;
    backMedia: Media;
    fullName: string;
    phone: string;
    cccdNumber: string;
    issuedDate: string;
    issuedPlace: string;
    status: 'pending_verify' | 'verified' | 'rejected';
    verifiedAt: string;
    rejectedReason: string;
    clinicId: string;
}

// Main Clinic type
export interface Clinic {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    code: string;
    referralCode: string | null;
    businessLicenseUrl: string | null;
    name: string;
    openTime: string | null;
    closeTime: string | null;
    businessRegistrationNumber: string | null;
    mediaId: string | null;
    phone: string | null;
    email: string | null;
    description: string | null;
    address: Address;
    location: Location;
    status: 'pending' | 'active' | 'inactive';
    deletedAt: string | null;
    clinicMedias: ClinicMedia[];
    userDocuments: UserDocument[];
}

// Simplified clinic for forms/displays
export interface ClinicFormData {
    name: string;
    phone?: string;
    email?: string;
    description?: string;
    businessRegistrationNumber?: string;
    businessLicenseUrl?: string;
    address: Address;
    location: Location;
    openTime?: string;
    closeTime?: string;
}
