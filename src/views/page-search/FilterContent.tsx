import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface Props {
  selectedStops: string[];
  setSelectedStops: (stops: string[]) => void;
  selectedAirlines: string[];
  setSelectedAirlines: (airlines: string[]) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  resetFilters: () => void;
  selectedBaggage: string[];
  setSelectedBaggage: (baggage: string[]) => void;
  selectedArrivalAirports: string[];
  setSelectedArrivalAirports: (airports: string[]) => void;
}

// Filter data
const stopOptions = [
  { id: "direct", label: "Direct (8)", count: 8, price: 110 },
  { id: "1stop", label: "1 Stop (18)", count: 18, price: 235 },
  { id: "2stops", label: "2+ Stops (4)", count: 4, price: 165 },
];

const airlineOptions = [
  { id: "singapore", label: "Singapore Airlines", price: 110 },
  { id: "qatar", label: "Qatar Airways", price: 298 },
  { id: "emirates", label: "Emirates", price: 275 },
  { id: "saudi", label: "Saudi Airlines", price: 185 },
  { id: "ana", label: "ANA All Nippon", price: 280 },
  { id: "cathay", label: "Cathay Pacific", price: 225 },
  { id: "airfrance", label: "Air France", price: 295 },
  { id: "turkish", label: "Turkish Airlines", price: 265 },
  { id: "etihad", label: "Etihad Airways", price: 310 },
  { id: "lufthansa", label: "Lufthansa", price: 285 },
  { id: "british", label: "British Airways", price: 355 },
  { id: "klm", label: "KLM Royal Dutch", price: 270 },
  { id: "thai", label: "Thai Airways", price: 305 },
  { id: "malaysia", label: "Malaysia Airlines", price: 245 },
  { id: "oman", label: "Oman Air", price: 235 },
  { id: "indigo", label: "IndiGo", price: 175 },
  { id: "spicejet", label: "SpiceJet", price: 165 },
];

// const durationOptions = [
//   { id: "4h50m", label: "4h 50m", range: "30h25m" },
//   { id: "6h30m", label: "6h 30m", range: "30h25m" },
// ];

const baggageOptions = [
  { id: "25kg", label: "25 KG", count: 1, type: "Luggage" },
  { id: "32kg", label: "32 KG", count: 2, type: "Luggage" },
  { id: "40kg", label: "40 KG", count: 2, type: "Luggage" },
];

const arrivalAirportOptions = [
  { id: "airindia", label: "Air India", price: 110 },
  { id: "philippine", label: "Philippine Airlines", price: 324 },
  { id: "jetblue", label: "JetBlue Airways", price: 349 },
  { id: "qatarairways", label: "Qatar Airways", price: 110 },
];

export const FilterContent = (p: Props) => {
  const {
    selectedStops,
    setSelectedStops,
    selectedAirlines,
    setSelectedAirlines,
    priceRange,
    setPriceRange,
    resetFilters,
    selectedBaggage,
    setSelectedBaggage,
    selectedArrivalAirports,
    setSelectedArrivalAirports,
  } = p;

  const [expandedSections, setExpandedSections] = useState({
    airlines: true,
    price: true,
    duration: false,
    baggage: false,
    arrivalAirports: false,
    flightQuality: false,
    aircraft: false,
    bookingSites: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filter By</h3>
        <Button
          variant="link"
          onClick={resetFilters}
          className="text-blue-600 p-0 h-auto"
        >
          Reset
        </Button>
      </div>

      {/* Stops Filter */}
      <div>
        <h4 className="font-medium mb-3">Stop</h4>
        <div className="space-y-2">
          {stopOptions.map((option) => (
            <div key={option.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={selectedStops.includes(option.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedStops([...selectedStops, option.id]);
                    } else {
                      setSelectedStops(
                        selectedStops.filter((s) => s !== option.id)
                      );
                    }
                  }}
                />
                <Label htmlFor={option.id} className="text-sm">
                  {option.label}
                </Label>
              </div>
              <span className="text-sm text-gray-500">${option.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Airlines Filter */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("airlines")}
        >
          <h4 className="font-medium">Airlines</h4>
          {expandedSections.airlines ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
        {expandedSections.airlines && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {airlineOptions.map((airline) => (
              <div
                key={airline.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={airline.id}
                    checked={selectedAirlines.includes(airline.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedAirlines([...selectedAirlines, airline.id]);
                      } else {
                        setSelectedAirlines(
                          selectedAirlines.filter((a) => a !== airline.id)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={airline.id} className="text-sm">
                    {airline.label}
                  </Label>
                </div>
                <span className="text-sm text-gray-500">${airline.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("price")}
        >
          <h4 className="font-medium">Price</h4>
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
        {expandedSections.price && (
          <>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={500}
              min={150}
              step={5}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </>
        )}
      </div>

      {/* Duration Filter */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("duration")}
        >
          <h4 className="font-medium">Duration</h4>
          {expandedSections.duration ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
        {expandedSections.duration && (
          <div className="space-y-2">
            <Slider
              value={[280, 1840]}
              max={2000}
              min={200}
              step={10}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>4h 50m</span>
              <span>30h 25m</span>
            </div>
          </div>
        )}
      </div>

      {/* Baggage Allowance Filter */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("baggage")}
        >
          <h4 className="font-medium">Baggage Allowance</h4>
          {expandedSections.baggage ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
        {expandedSections.baggage && (
          <div className="space-y-2">
            {baggageOptions.map((baggage) => (
              <div
                key={baggage.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={baggage.id}
                    checked={selectedBaggage.includes(baggage.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedBaggage([...selectedBaggage, baggage.id]);
                      } else {
                        setSelectedBaggage(
                          selectedBaggage.filter((b) => b !== baggage.id)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={baggage.id} className="text-sm">
                    {baggage.label}
                  </Label>
                </div>
                <span className="text-sm text-gray-500">
                  {baggage.count} {baggage.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Arrival Airports Filter */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("arrivalAirports")}
        >
          <h4 className="font-medium">Arrival Airports</h4>
          {expandedSections.arrivalAirports ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
        {expandedSections.arrivalAirports && (
          <div className="space-y-2">
            {arrivalAirportOptions.map((airport) => (
              <div
                key={airport.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={airport.id}
                    checked={selectedArrivalAirports.includes(airport.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedArrivalAirports([
                          ...selectedArrivalAirports,
                          airport.id,
                        ]);
                      } else {
                        setSelectedArrivalAirports(
                          selectedArrivalAirports.filter(
                            (a) => a !== airport.id
                          )
                        );
                      }
                    }}
                  />
                  <Label htmlFor={airport.id} className="text-sm">
                    {airport.label}
                  </Label>
                </div>
                <span className="text-sm text-gray-500">${airport.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Flight Quality Filter */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("flightQuality")}
        >
          <h4 className="font-medium">Flight Quality</h4>
          {expandedSections.flightQuality ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </div>

      {/* Aircraft Filter */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("aircraft")}
        >
          <h4 className="font-medium">Aircraft</h4>
          {expandedSections.aircraft ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </div>

      {/* Booking Sites Filter */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("bookingSites")}
        >
          <h4 className="font-medium">Booking Sites</h4>
          {expandedSections.bookingSites ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </div>
    </div>
  );
};
