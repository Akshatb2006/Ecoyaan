export interface ShippingAddress {
    fullName: string;
    email: string;
    phone: string;
    pinCode: string;
    city: string;
    state: string;
}

export interface ShippingFormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    pinCode?: string;
    city?: string;
    state?: string;
}
