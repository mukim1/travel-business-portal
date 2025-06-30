// components/BookingProgress.tsx
import React from "react";

interface BookingProgressProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Details" },
  { number: 2, label: "Review" },
  { number: 3, label: "Payment" },
];

export function BookingProgress({ currentStep }: BookingProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div
              className={`flex items-center ${
                currentStep >= step.number ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step.number
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {step.number}
              </div>
              <span className="ml-2 font-medium">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-16 h-px bg-gray-300"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
