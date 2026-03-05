'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { setShippingAddress } from '@/store/slices/shippingSlice';
import { ShippingAddress, ShippingFormErrors } from '@/types';
import { validateShippingForm, hasErrors } from '@/utils/validation';
import StepIndicator from '@/components/StepIndicator';

const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu & Kashmir', 'Ladakh',
];

const initialValues: ShippingAddress = {
    fullName: '',
    email: '',
    phone: '',
    pinCode: '',
    city: '',
    state: '',
};

export default function ShippingPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [values, setValues] = useState<ShippingAddress>(initialValues);
    const [errors, setErrors] = useState<ShippingFormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const newValues = { ...values, [name]: value };
            const newErrors = validateShippingForm(newValues);
            setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof ShippingFormErrors] }));
        }
    };

    const handleBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const validationErrors = validateShippingForm(values);
        setErrors((prev) => ({
            ...prev,
            [name]: validationErrors[name as keyof ShippingFormErrors],
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const allTouched = Object.keys(values).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {}
        );
        setTouched(allTouched);

        const validationErrors = validateShippingForm(values);
        setErrors(validationErrors);

        if (!hasErrors(validationErrors)) {
            dispatch(setShippingAddress(values));
            router.push('/checkout/payment');
        }
    };

    const renderField = (
        label: string,
        name: keyof ShippingAddress,
        type: string = 'text',
        placeholder: string = ''
    ) => (
        <div className="form-field">
            <label htmlFor={name} className="form-field__label">
                {label} <span className="form-field__required">*</span>
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                className={`form-field__input ${errors[name] && touched[name] ? 'form-field__input--error' : ''
                    }`}
            />
            {errors[name] && touched[name] && (
                <p className="form-field__error">{errors[name]}</p>
            )}
        </div>
    );

    return (
        <main className="checkout-page">
            <StepIndicator currentStep={2} />

            <div className="checkout-page__content checkout-page__content--centered">
                <div className="shipping-form-card">
                    <div className="shipping-form-card__header">
                        <h2 className="shipping-form-card__title">Shipping Address</h2>
                        <p className="shipping-form-card__subtitle">
                            Where should we deliver your eco-friendly order?
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="shipping-form" noValidate>
                        {renderField('Full Name', 'fullName', 'text', 'John Doe')}

                        <div className="shipping-form__row">
                            {renderField('Email Address', 'email', 'email', 'john@example.com')}
                            {renderField('Phone Number', 'phone', 'tel', '9876543210')}
                        </div>

                        <div className="shipping-form__row">
                            {renderField('PIN Code', 'pinCode', 'text', '400001')}
                            {renderField('City', 'city', 'text', 'Mumbai')}
                        </div>

                        <div className="form-field">
                            <label htmlFor="state" className="form-field__label">
                                State <span className="form-field__required">*</span>
                            </label>
                            <select
                                id="state"
                                name="state"
                                value={values.state}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-field__input form-field__select ${errors.state && touched.state ? 'form-field__input--error' : ''
                                    }`}
                            >
                                <option value="">Select State</option>
                                {INDIAN_STATES.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                            {errors.state && touched.state && (
                                <p className="form-field__error">{errors.state}</p>
                            )}
                        </div>

                        <div className="shipping-form__actions">
                            <button
                                type="button"
                                onClick={() => router.push('/')}
                                className="btn btn--outline"
                            >
                                Back to Cart
                            </button>
                            <button
                                id="continue-to-payment"
                                type="submit"
                                className="btn btn--primary"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
