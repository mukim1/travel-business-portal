
// components/BookingSteps.tsx
import React from 'react'

interface BookingStepsProps {
  currentStep: number
}

const steps = [
  { id: 1, label: 'Details' },
  { id: 2, label: 'Review' },
  { id: 3, label: 'Payment' },
]

export const BookingSteps: React.FC<BookingStepsProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className={`flex items-center ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {step.id}
            </div>
            <span className="ml-2 font-medium">{step.label}</span>
          </div>
          {index < steps.length - 1 && <div className="w-16 h-px bg-gray-300" />}
        </React.Fragment>
      ))}
    </div>
  )
}