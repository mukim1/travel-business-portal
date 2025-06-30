// components/BookingSummary.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plane, Users, Calendar, MapPin } from "lucide-react";
import type { PassengerForm } from "@/types/booking";

interface Flight {
  id: string;
  airline: string;
  departure: { time: string; code: string };
  arrival: { time: string; code: string };
  duration: string;
  price: number;
}

interface SearchParams {
  departureDate: string;
  passenger: {
    adult: number;
    children: number;
    infant: number;
  };
}

interface BookingSummaryProps {
  flight: Flight;
  passengers: PassengerForm[];
  searchParams: SearchParams;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  flight,
  passengers,
  searchParams,
}) => {
  // Calculate pricing details
  const adultCount = searchParams.passenger.adult;
  const childCount = searchParams.passenger.children;
  const infantCount = searchParams.passenger.infant;

  const adultPrice = flight.price * adultCount;
  const childPrice = flight.price * childCount * 0.8; // Children typically pay 80% of adult fare
  const infantPrice = flight.price * infantCount * 0.1; // Infants typically pay 10% of adult fare

  const basePrice = adultPrice + childPrice + infantPrice;
  const taxesAndFees = Math.round(basePrice * 0.15);
  const totalPrice = basePrice + taxesAndFees;

  return (
    <div className="space-y-6">
      {/* Flight Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plane className="h-5 w-5" />
            <span>Flight Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Flight route and timing */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {flight.departure.time}
                    </div>
                    <div className="text-sm text-gray-600">
                      {flight.departure.code}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <div className="w-12 h-px bg-blue-300"></div>
                    <Plane className="h-4 w-4 text-blue-500" />
                    <div className="w-12 h-px bg-blue-300"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {flight.arrival.time}
                    </div>
                    <div className="text-sm text-gray-600">
                      {flight.arrival.code}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Date: {searchParams.departureDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Plane className="h-4 w-4 text-gray-500" />
                  <span>Airline: {flight.airline}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>Duration: {flight.duration}</span>
                </div>
              </div>
            </div>

            {/* Flight details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-1">
                  Flight Number
                </h4>
                <p className="text-sm text-gray-600">{flight.id}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-1">
                  Aircraft Type
                </h4>
                <p className="text-sm text-gray-600">Boeing 737-800</p>{" "}
                {/* You can make this dynamic if you have aircraft data */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Passenger Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>
              Passenger Details ({passengers.length} passenger
              {passengers.length > 1 ? "s" : ""})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {passengers.map((passenger, index) => {
              const isAdult = index < adultCount;
              const passengerType = isAdult ? "Adult" : "Child";
              const passengerNumber = isAdult
                ? index + 1
                : index - adultCount + 1;

              return (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">
                          {passenger.title} {passenger.firstName}{" "}
                          {passenger.lastName}
                        </h4>
                        <Badge variant={isAdult ? "default" : "secondary"}>
                          {passengerType} {passengerNumber}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Gender:</span>{" "}
                          {passenger.gender}
                        </div>
                        <div>
                          <span className="font-medium">Date of Birth:</span>{" "}
                          {passenger.dateOfBirth}
                        </div>
                        <div>
                          <span className="font-medium">Country:</span>{" "}
                          {passenger.country}
                        </div>
                        <div>
                          <span className="font-medium">Email:</span>{" "}
                          {passenger.email}
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span>{" "}
                          {passenger.phone}
                        </div>
                        {passenger.passportNumber && (
                          <div>
                            <span className="font-medium">Passport:</span>{" "}
                            {passenger.passportNumber}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Adult pricing */}
            {adultCount > 0 && (
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">
                    Adult Passenger{adultCount > 1 ? "s" : ""} ({adultCount})
                  </span>
                  <div className="text-sm text-gray-500">
                    Base fare: ${flight.price} × {adultCount}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${adultPrice}</div>
                  <div className="text-sm text-gray-500">
                    Tax: ${Math.round(adultPrice * 0.15)}
                  </div>
                </div>
              </div>
            )}

            {/* Child pricing */}
            {childCount > 0 && (
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">
                    Child Passenger{childCount > 1 ? "s" : ""} ({childCount})
                  </span>
                  <div className="text-sm text-gray-500">
                    Base fare: ${Math.round(flight.price * 0.8)} × {childCount}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${childPrice}</div>
                  <div className="text-sm text-gray-500">
                    Tax: ${Math.round(childPrice * 0.15)}
                  </div>
                </div>
              </div>
            )}

            {/* Infant pricing */}
            {infantCount > 0 && (
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">
                    Infant Passenger{infantCount > 1 ? "s" : ""} ({infantCount})
                  </span>
                  <div className="text-sm text-gray-500">
                    Base fare: ${Math.round(flight.price * 0.1)} × {infantCount}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${infantPrice}</div>
                  <div className="text-sm text-gray-500">
                    Tax: ${Math.round(infantPrice * 0.15)}
                  </div>
                </div>
              </div>
            )}

            <Separator />

            {/* Subtotals */}
            <div className="flex justify-between items-center">
              <span className="font-medium">Subtotal</span>
              <span className="font-medium">${basePrice}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Taxes & Fees</span>
              <span className="text-sm text-gray-600">${taxesAndFees}</span>
            </div>

            <Separator />

            {/* Total */}
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-blue-600">${totalPrice}</span>
            </div>

            {/* Payment terms */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Your booking will be confirmed after
                successful payment. Cancellation and modification policies apply
                as per airline terms.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              • By proceeding with this booking, you agree to the airline&apos;s
              terms and conditions
            </p>
            <p>• Flight times are subject to change by the airline</p>
            <p>
              • Passengers must arrive at the airport at least 2 hours before
              domestic flights
            </p>
            <p>• Valid identification is required for all passengers</p>
            <p>• Baggage policies and fees are as per airline regulations</p>
            <p>
              • Refund and cancellation policies vary by fare type and airline
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
