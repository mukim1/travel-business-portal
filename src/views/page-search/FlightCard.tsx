import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plane } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  id: string;
  airline: string;
  refundable: boolean;
  price: number;
  class: string;
  departure: {
    time: string;
    code: string;
    airport: string;
  };
  arrival: {
    time: string;
    code: string;
    airport: string;
  };
  duration: string;
  stops: number;

  handleBookFlight: (id: string) => void;
}

const FlightCard = (flight: Props) => {
  const handleBookFlight = (id: string) => {
    flight.handleBookFlight(id);
  };

  return (
    <Card key={flight.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Plane className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{flight.airline}</h3>
                <div className="flex items-center space-x-1 mt-1">
                  {flight.refundable && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-green-100 text-green-800"
                    >
                      Refundable
                    </Badge>
                  )}
                  {!flight.refundable && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-red-100 text-red-800"
                    >
                      Non Refundable
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end mb-1">
                {flight.price <= 200 && (
                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                    Cheapest
                  </Badge>
                )}
                {flight.price >= 400 && (
                  <Badge className="bg-orange-100 text-orange-800 text-xs">
                    Exclusive
                  </Badge>
                )}
              </div>
              <div className="text-xl font-bold text-blue-600">
                ${flight.price}
              </div>
              <div className="text-xs text-gray-500">{flight.class}</div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <div className="font-semibold">{flight.departure.time}</div>
              <div className="text-sm text-gray-500">
                {flight.departure.code}
              </div>
            </div>

            <div className="flex flex-col items-center px-4">
              <div className="text-sm text-gray-500 mb-1">
                {flight.duration}
              </div>
              <div className="flex items-center">
                <div className="w-6 h-px bg-gray-300"></div>
                <Plane className="h-3 w-3 text-gray-400 mx-2" />
                <div className="w-6 h-px bg-gray-300"></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {flight.stops === 0
                  ? "Non Stop"
                  : `${flight.stops} Stop${flight.stops > 1 ? "s" : ""}`}
              </div>
            </div>

            <div className="text-center">
              <div className="font-semibold">{flight.arrival.time}</div>
              <div className="text-sm text-gray-500">{flight.arrival.code}</div>
            </div>
          </div>

          <Button
            onClick={() => handleBookFlight(flight.id)}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Book Now
          </Button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Plane className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">{flight.airline}</h3>
              <div className="flex items-center space-x-2 mt-1">
                {flight.refundable && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-green-100 text-green-800"
                  >
                    Partially Refundable
                  </Badge>
                )}
                {!flight.refundable && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-red-100 text-red-800"
                  >
                    Non Refundable
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="font-semibold text-lg">
                {flight.departure.time}
              </div>
              <div className="text-sm text-gray-500">
                {flight.departure.code}
              </div>
              <div className="text-xs text-gray-400 max-w-24 truncate">
                {flight.departure.airport}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-sm text-gray-500 mb-1">
                {flight.duration}
              </div>
              <div className="flex items-center">
                <div className="w-8 h-px bg-gray-300"></div>
                <Plane className="h-4 w-4 text-gray-400 mx-2" />
                <div className="w-8 h-px bg-gray-300"></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {flight.stops === 0
                  ? "Non Stop"
                  : `${flight.stops} Stop${flight.stops > 1 ? "s" : ""}`}
              </div>
            </div>

            <div className="text-center">
              <div className="font-semibold text-lg">{flight.arrival.time}</div>
              <div className="text-sm text-gray-500">{flight.arrival.code}</div>
              <div className="text-xs text-gray-400 max-w-24 truncate">
                {flight.arrival.airport}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end mb-1">
              {flight.price <= 200 && (
                <Badge className="bg-blue-100 text-blue-800 text-xs mr-2">
                  Cheapest
                </Badge>
              )}
              {flight.price >= 400 && (
                <Badge className="bg-orange-100 text-orange-800 text-xs mr-2">
                  Exclusive
                </Badge>
              )}
            </div>
            <div className="text-2xl font-bold text-blue-600">
              ${flight.price}
            </div>
            <div className="text-sm text-gray-500 mb-3">{flight.class}</div>
            <Button
              onClick={() => handleBookFlight(flight.id)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
