'use client';

import { CheckoutStep } from '@/types';

interface StepIndicatorProps {
    currentStep: CheckoutStep;
}

const steps = [
    { step: 1 as CheckoutStep, label: 'Cart', number: '1' },
    { step: 2 as CheckoutStep, label: 'Shipping', number: '2' },
    { step: 3 as CheckoutStep, label: 'Payment', number: '3' },
    { step: 4 as CheckoutStep, label: 'Confirmation', number: '4' },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
    return (
        <nav aria-label="Checkout progress" className="step-indicator">
            <ol className="step-indicator__list">
                {steps.map(({ step, label, number }, index) => {
                    const isActive = step === currentStep;
                    const isCompleted = step < currentStep;

                    return (
                        <li key={step} className="step-indicator__item">
                            {index > 0 && (
                                <div
                                    className={`step-indicator__connector ${isCompleted || isActive
                                            ? 'step-indicator__connector--active'
                                            : ''
                                        }`}
                                />
                            )}

                            <div
                                className={`step-indicator__circle ${isCompleted
                                        ? 'step-indicator__circle--completed'
                                        : isActive
                                            ? 'step-indicator__circle--active'
                                            : ''
                                    }`}
                            >
                                {isCompleted ? (
                                    <svg
                                        className="step-indicator__check"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <span className="step-indicator__number">{number}</span>
                                )}
                            </div>

                            <span
                                className={`step-indicator__label ${isActive
                                        ? 'step-indicator__label--active'
                                        : isCompleted
                                            ? 'step-indicator__label--completed'
                                            : ''
                                    }`}
                            >
                                {label}
                            </span>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
