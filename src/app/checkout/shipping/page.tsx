'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    setShippingAddress,
    selectShippingAddresses,
    selectSelectedAddressId,
    selectAddress,
    removeAddress,
} from '@/store/slices/shippingSlice';
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

const emptyValues: Omit<ShippingAddress, 'id'> = {
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
    const addresses = useAppSelector(selectShippingAddresses);
    const selectedId = useAppSelector(selectSelectedAddressId);

    const [showForm, setShowForm] = useState(addresses.length === 0);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [values, setValues] = useState<Omit<ShippingAddress, 'id'>>(emptyValues);
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

    const handleSaveAddress = (e: React.FormEvent) => {
        e.preventDefault();

        const allTouched = Object.keys(emptyValues).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {}
        );
        setTouched(allTouched);

        const validationErrors = validateShippingForm(values);
        setErrors(validationErrors);

        if (!hasErrors(validationErrors)) {
            const id = editingId || `addr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
            dispatch(setShippingAddress({ ...values, id }));
            setValues(emptyValues);
            setErrors({});
            setTouched({});
            setEditingId(null);
            setShowForm(false);
        }
    };

    const handleEdit = (addr: ShippingAddress) => {
        setEditingId(addr.id);
        setValues({
            fullName: addr.fullName,
            email: addr.email,
            phone: addr.phone,
            pinCode: addr.pinCode,
            city: addr.city,
            state: addr.state,
            label: addr.label,
        });
        setErrors({});
        setTouched({});
        setShowForm(true);
    };

    const handleAddNew = () => {
        setEditingId(null);
        setValues(emptyValues);
        setErrors({});
        setTouched({});
        setShowForm(true);
    };

    const handleCancelForm = () => {
        if (addresses.length > 0) {
            setShowForm(false);
            setEditingId(null);
            setValues(emptyValues);
            setErrors({});
            setTouched({});
        }
    };

    const handleContinue = () => {
        if (selectedId) {
            router.push('/checkout/payment');
        }
    };

    const renderField = (
        label: string,
        name: keyof Omit<ShippingAddress, 'id'>,
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
                value={values[name] ?? ''}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                className={`form-field__input ${errors[name as keyof ShippingFormErrors] && touched[name] ? 'form-field__input--error' : ''
                    }`}
            />
            {errors[name as keyof ShippingFormErrors] && touched[name] && (
                <p className="form-field__error">{errors[name as keyof ShippingFormErrors]}</p>
            )}
        </div>
    );

    return (
        <main className="checkout-page checkout-page--has-sticky-bar">
            <StepIndicator currentStep={2} />

            <div className="checkout-page__content checkout-page__content--centered">
                <div className="shipping-container">
                    <div className="shipping-header">
                        <h2 className="shipping-header__title">Shipping Address</h2>
                        <p className="shipping-header__subtitle">
                            Where should we deliver your eco-friendly order?
                        </p>
                    </div>

                    {/* Saved addresses list */}
                    {addresses.length > 0 && !showForm && (
                        <div className="address-list">
                            {addresses.map((addr) => (
                                <div
                                    key={addr.id}
                                    className={`address-list__card ${selectedId === addr.id ? 'address-list__card--selected' : ''}`}
                                    onClick={() => dispatch(selectAddress(addr.id))}
                                >
                                    <div className="address-list__radio">
                                        <input
                                            type="radio"
                                            name="selectedAddress"
                                            checked={selectedId === addr.id}
                                            onChange={() => dispatch(selectAddress(addr.id))}
                                        />
                                    </div>
                                    <div className="address-list__details">
                                        <div className="address-list__name-row">
                                            <span className="address-list__name">{addr.fullName}</span>
                                            {addr.label && (
                                                <span className="address-list__label-badge">{addr.label}</span>
                                            )}
                                        </div>
                                        <p className="address-list__line">
                                            {addr.city}, {addr.state} - {addr.pinCode}
                                        </p>
                                        <p className="address-list__line">{addr.phone}</p>
                                        <p className="address-list__line address-list__line--muted">{addr.email}</p>
                                    </div>
                                    <div className="address-list__actions">
                                        <button
                                            className="address-list__edit-btn"
                                            onClick={(e) => { e.stopPropagation(); handleEdit(addr); }}
                                        >
                                            Edit
                                        </button>
                                        {addresses.length > 1 && (
                                            <button
                                                className="address-list__delete-btn"
                                                onClick={(e) => { e.stopPropagation(); dispatch(removeAddress(addr.id)); }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <button className="address-list__add-btn" onClick={handleAddNew}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                Add New Address
                            </button>
                        </div>
                    )}

                    {/* Address form */}
                    {showForm && (
                        <div className="shipping-form-card">
                            <div className="shipping-form-card__header">
                                <h3 className="shipping-form-card__title">
                                    {editingId ? 'Edit Address' : 'Add New Address'}
                                </h3>
                            </div>

                            <form onSubmit={handleSaveAddress} className="shipping-form" noValidate>
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

                                <div className="shipping-form__form-actions">
                                    {addresses.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={handleCancelForm}
                                            className="btn btn--outline"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        className="btn btn--primary"
                                    >
                                        {editingId ? 'Update Address' : 'Save Address'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky bottom bar */}
            <div className="sticky-bottom-bar">
                <div className="sticky-bottom-bar__inner">
                    <button
                        type="button"
                        onClick={() => router.push('/')}
                        className="btn btn--outline"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
                        </svg>
                        Back to Cart
                    </button>
                    <button
                        id="continue-to-payment"
                        type="button"
                        onClick={handleContinue}
                        disabled={!selectedId || showForm}
                        className="btn btn--primary"
                    >
                        Next Step
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </div>
            </div>
        </main>
    );
}
