import { ShippingAddress, ShippingFormErrors } from '@/types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;
const PINCODE_REGEX = /^\d{6}$/;

export function validateShippingForm(
    values: ShippingAddress
): ShippingFormErrors {
    const errors: ShippingFormErrors = {};

    if (!values.fullName.trim()) {
        errors.fullName = 'Full name is required';
    } else if (values.fullName.trim().length < 2) {
        errors.fullName = 'Name must be at least 2 characters';
    }

    if (!values.email.trim()) {
        errors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(values.email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (!values.phone.trim()) {
        errors.phone = 'Phone number is required';
    } else if (!PHONE_REGEX.test(values.phone)) {
        errors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!values.pinCode.trim()) {
        errors.pinCode = 'PIN code is required';
    } else if (!PINCODE_REGEX.test(values.pinCode)) {
        errors.pinCode = 'PIN code must be exactly 6 digits';
    }

    if (!values.city.trim()) {
        errors.city = 'City is required';
    }

    if (!values.state.trim()) {
        errors.state = 'State is required';
    }

    return errors;
}

export function hasErrors(errors: ShippingFormErrors): boolean {
    return Object.keys(errors).length > 0;
}
