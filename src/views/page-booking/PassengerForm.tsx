

// components/PassengerForm.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PassengerFormField } from './PassengerFormField'
import type { PassengerForm as PassengerFormType } from '@/types/booking'

interface PassengerFormProps {
  passenger: PassengerFormType
  index: number
  isAdult: boolean
  onUpdate: (field: keyof PassengerFormType, value: string) => void
  errors: Record<string, string>
}

const titleOptions = [
  { value: 'mr', label: 'Mr.' },
  { value: 'mrs', label: 'Mrs.' },
  { value: 'ms', label: 'Ms.' },
]

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'bd', label: 'Bangladesh' },
  { value: 'in', label: 'India' },
]

export const PassengerForm: React.FC<PassengerFormProps> = ({
  passenger,
  index,
  isAdult,
  onUpdate,
  errors,
}) => {
  const getError = (field: string) => errors[`passenger-${index}-${field}`]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Passenger Info</span>
          <Badge variant={isAdult ? 'default' : 'secondary'}>
            {isAdult ? `Adult ${index + 1}` : `Child ${index + 1}`}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PassengerFormField
            type="select"
            label="Title"
            value={passenger.title}
            onChange={(value) => onUpdate('title', value)}
            required
            placeholder="Select Title"
            options={titleOptions}
            error={getError('title')}
          />

          <PassengerFormField
            type="input"
            label="First Name"
            value={passenger.firstName}
            onChange={(value) => onUpdate('firstName', value)}
            required
            placeholder="First Name"
            error={getError('firstName')}
          />

          <PassengerFormField
            type="input"
            label="Last Name"
            value={passenger.lastName}
            onChange={(value) => onUpdate('lastName', value)}
            required
            placeholder="Last Name"
            error={getError('lastName')}
          />

          <PassengerFormField
            type="select"
            label="Gender"
            value={passenger.gender}
            onChange={(value) => onUpdate('gender', value)}
            required
            placeholder="Select Gender"
            options={genderOptions}
            error={getError('gender')}
          />

          <PassengerFormField
            type="date"
            label="Date of Birth"
            value={passenger.dateOfBirth}
            onChange={(value) => onUpdate('dateOfBirth', value)}
            required
            error={getError('dateOfBirth')}
          />

          <PassengerFormField
            type="select"
            label="Country"
            value={passenger.country}
            onChange={(value) => onUpdate('country', value)}
            required
            placeholder="Select Country"
            options={countryOptions}
            error={getError('country')}
          />

          <PassengerFormField
            type="input"
            label="Email"
            value={passenger.email}
            onChange={(value) => onUpdate('email', value)}
            required
            placeholder="Email Address"
            error={getError('email')}
          />

          <PassengerFormField
            type="input"
            label="Phone Number"
            value={passenger.phone}
            onChange={(value) => onUpdate('phone', value)}
            required
            placeholder="Phone Number"
            error={getError('phone')}
          />

          <PassengerFormField
            type="input"
            label="Passport Number"
            value={passenger.passportNumber || ''}
            onChange={(value) => onUpdate('passportNumber', value)}
            required={isAdult}
            placeholder="Passport Number"
            error={getError('passportNumber')}
          />
        </div>
      </CardContent>
    </Card>
  )
}
