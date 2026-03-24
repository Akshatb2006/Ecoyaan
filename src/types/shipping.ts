export interface ShippingAddress {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    pinCode: string;
    city: string;
    state: string;
    label?: string;
}

export interface ShippingFormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    pinCode?: string;
    city?: string;
    state?: string;
}
