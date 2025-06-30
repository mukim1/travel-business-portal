
// components/FlightDetailsCard.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plane } from 'lucide-react'

interface Flight {
  id: string
  airline: string
  departure: { time: string; code: string }
  arrival: { time: string; code: string }
  duration: string
}

interface FlightDetailsCardProps {
  flight: Flight
}

export const FlightDetailsCard: React.FC<FlightDetailsCardProps> = ({ flight }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plane className="h-5 w-5" />
          <span>Flight Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <div className="font-semibold text-lg">{flight.departure.time}</div>
              <div className="text-sm text-gray-500">{flight.departure.code}</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-px bg-gray-300"></div>
              <Plane className="h-4 w-4 text-gray-400" />
              <div className="w-8 h-px bg-gray-300"></div>
            </div>
            <div>
              <div className="font-semibold text-lg">{flight.arrival.time}</div>
              <div className="text-sm text-gray-500">{flight.arrival.code}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold">{flight.airline}</div>
            <div className="text-sm text-gray-500">{flight.duration}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}