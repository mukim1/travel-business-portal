"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, MapPin, Plane, Users } from "lucide-react";
import { format } from "date-fns";
import { useSearch } from "@/contexts/SearchContext";
import { cn } from "@/lib/utils"; // Assuming cn is a utility for combining class names
import { toast } from "sonner";

// --- Main Component ---

export default function SearchForm() {
  const router = useRouter();
  const { searchFlights } = useSearch();
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState({
    adult: 1,
    children: 0,
    infant: 0,
  });

  const handleSearch = useCallback(async () => {
    if (!origin.trim() || !destination.trim() || !departureDate) {
      toast.error(
        "Please fill in all required fields (Origin, Destination, and Departure Date)."
      );
      return;
    }

    if (tripType === "round-trip" && !returnDate) {
      toast.error("Please select a return date for round-trip journeys.");
      return;
    }

    // Optional: Add more robust validation here (e.g., date in future, IATA code validation)

    const searchParams = {
      origin,
      destination,
      departureDate: departureDate
        ? format(departureDate, "dd MMM yyyy")
        : undefined,
      returnDate:
        returnDate && tripType === "round-trip"
          ? format(returnDate, "dd MMM yyyy")
          : undefined,
      passenger: passengers,
      tripType,
    };

    await searchFlights(searchParams as any); // Type assertion might be avoided with proper typing of searchFlights
    router.push("/search");
  }, [
    origin,
    destination,
    departureDate,
    returnDate,
    passengers,
    tripType,
    searchFlights,
    router,
  ]);

  const handlePassengerChange = useCallback(
    (type: "adult" | "children" | "infant", change: 1 | -1) => {
      setPassengers((prev) => {
        const newCount = prev[type] + change;
        return {
          ...prev,
          [type]: Math.max(type === "adult" ? 1 : 0, newCount),
        };
      });
    },
    []
  );

  return (
    <div
      style={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
      className="rounded-lg shadow-xl p-8 max-w-4xl mx-auto border border-gray-100 animate-fade-in"
    >
      <div className="flex space-x-3 mb-6">
        <Button
          variant={tripType === "one-way" ? "default" : "outline"}
          onClick={() => setTripType("one-way")}
          className={cn(
            "rounded-full px-5 py-2 text-base font-semibold transition-colors duration-200",
            tripType !== "one-way" && "text-gray-600"
          )}
        >
          One-Way
        </Button>
        <Button
          variant={tripType === "round-trip" ? "default" : "outline"}
          onClick={() => setTripType("round-trip")}
          className={cn(
            "rounded-full px-5 py-2 text-base font-semibold transition-colors duration-200",
            tripType !== "round-trip" && "text-gray-600"
          )}
        >
          Round-Trip
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <LabeledInput
          id="origin"
          label="From"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          icon={Plane}
        />
        <LabeledInput
          id="destination"
          label="To"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          icon={Plane}
          iconClass="rotate-90"
        />

        <div className="space-y-2">
          <Label className="text-gray-600 text-sm mb-2 flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-blue-500" />
            <span>Departure</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center justify-between w-full px-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-500">
                    {departureDate
                      ? format(departureDate, "PPP")
                      : "Pick a date"}
                  </span>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={departureDate}
                onSelect={setDepartureDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-600 text-sm mb-2 flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-blue-500" />
            <span>Return</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                disabled={tripType === "one-way"}
                className="flex items-center justify-between w-full px-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-500">
                    {returnDate ? format(returnDate, "PPP") : "Pick a date"}
                  </span>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 items-end">
        <div className="space-y-2 flex-1">
          <Label className="text-gray-600 text-sm mb-2 flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500" />
            <span>Travelers</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center justify-between w-full px-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-500">
                    {passengers.adult + passengers.children + passengers.infant}{" "}
                    Passenger(s)
                  </span>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <PassengerControl
                  label="Adults"
                  description="12+ years"
                  count={passengers.adult}
                  onIncrement={() => handlePassengerChange("adult", 1)}
                  onDecrement={() => handlePassengerChange("adult", -1)}
                  min={1} // Ensure at least one adult
                />
                <PassengerControl
                  label="Children"
                  description="2-11 years"
                  count={passengers.children}
                  onIncrement={() => handlePassengerChange("children", 1)}
                  onDecrement={() => handlePassengerChange("children", -1)}
                />
                <PassengerControl
                  label="Infants"
                  description="Under 2 years"
                  count={passengers.infant}
                  onIncrement={() => handlePassengerChange("infant", 1)}
                  onDecrement={() => handlePassengerChange("infant", -1)}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <button
          onClick={handleSearch}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ease-in-out w-full sm:w-auto"
        >
          Search Flights
        </button>
      </div>
    </div>
  );
}

// --- Helper Components ---

interface PassengerControlProps {
  label: string;
  description: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
}

const PassengerControl: React.FC<PassengerControlProps> = ({
  label,
  description,
  count,
  onIncrement,
  onDecrement,
  min = 0,
}) => (
  <div className="flex items-center justify-between">
    <div>
      <div className="font-medium text-gray-800">{label}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        className="w-8 h-8 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
        onClick={onDecrement}
        disabled={count <= min}
      >
        -
      </Button>
      <span className="w-8 text-center font-semibold text-lg">{count}</span>
      <Button
        variant="outline"
        size="sm"
        className="w-8 h-8 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
        onClick={onIncrement}
      >
        +
      </Button>
    </div>
  </div>
);

interface LabeledInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ElementType;
  iconClass?: string;
  inputClass?: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  icon: Icon,
  iconClass,
  inputClass,
}) => (
  <div>
    <Label
      htmlFor={id}
      className="text-gray-600 text-sm mb-2 flex items-center gap-2"
    >
      <Icon className={cn("h-4 w-4 text-blue-500", iconClass)} />
      <span>{label}</span>
    </Label>
    <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
      <MapPin className="w-5 h-5 text-gray-400" />{" "}
      {/* Keep MapPin as default for consistency */}
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn("flex-1 outline-none text-gray-800", inputClass)}
      />
    </div>
  </div>
);
