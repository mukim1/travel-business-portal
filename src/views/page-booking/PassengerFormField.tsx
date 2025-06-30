

// components/PassengerFormField.tsx
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface PassengerFormFieldProps {
  type: 'input' | 'select' | 'date'
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  error?: string
}

export const PassengerFormField: React.FC<PassengerFormFieldProps> = ({
  type,
  label,
  value,
  onChange,
  required = false,
  placeholder,
  options = [],
  error,
}) => {
  const displayLabel = required ? `${label}*` : label

  return (
    <div className="space-y-1">
      <Label>{displayLabel}</Label>
      {type === 'select' ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className={error ? 'border-red-500' : ''}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          type={type === 'date' ? 'date' : 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={error ? 'border-red-500' : ''}
        />
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}