"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSearch } from "@/contexts/SearchContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Plane, ArrowRight, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterContent } from "@/views/page-search/FilterContent";
import FlightCard from "@/views/page-search/FlightCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SearchPage() {
  const { flights, searchParams, isLoading } = useSearch();
  const { user } = useAuth();
  const router = useRouter();

  // Filter states
  const [priceRange, setPriceRange] = useState([165, 450]);
  const [selectedStops, setSelectedStops] = useState<string[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedBaggage, setSelectedBaggage] = useState<string[]>([]);
  const [selectedArrivalAirports, setSelectedArrivalAirports] = useState<
    string[]
  >([]);
  // const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  // const [selectedFlightQuality, setSelectedFlightQuality] = useState<string[]>(
  //   []
  // );
  // const [selectedAircraft, setSelectedAircraft] = useState<string[]>([]);
  // const [selectedBookingSites, setSelectedBookingSites] = useState<string[]>(
  //   []
  // );

  // Mobile filter sheet state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Expandable sections

  const handleBookFlight = (flightId: string) => {
    // if (!user) {
    //   router.push("/login");
    //   return;
    // }
    // router.push(`/booking/${flightId}`);
    
    if (!user) {
      // Redirect to login with the booking page as the redirect URL
      router.push(`/login?redirect=${encodeURIComponent(`/booking/${flightId}`)}`)
      return
    }
    router.push(`/booking/${flightId}`)
  };

  // Filtered flights
  const filteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      // Price filter
      if (flight.price < priceRange[0] || flight.price > priceRange[1])
        return false;

      // Stops filter
      if (selectedStops.length > 0) {
        const stopFilter = selectedStops.some((stop) => {
          if (stop === "direct" && flight.stops === 0) return true;
          if (stop === "1stop" && flight.stops === 1) return true;
          if (stop === "2stops" && flight.stops >= 2) return true;
          return false;
        });
        if (!stopFilter) return false;
      }

      // Airlines filter
      if (selectedAirlines.length > 0) {
        const airlineMatch = selectedAirlines.some((airline) => {
          const airlineMap: { [key: string]: string } = {
            singapore: "Singapore Airlines",
            qatar: "Qatar Airways",
            emirates: "Emirates",
            saudi: "Saudi Airlines",
            ana: "ANA All Nippon",
            cathay: "Cathay Pacific",
            airfrance: "Air France",
            turkish: "Turkish Airlines",
            etihad: "Etihad Airways",
            lufthansa: "Lufthansa",
            british: "British Airways",
            klm: "KLM Royal Dutch",
            thai: "Thai Airways",
            malaysia: "Malaysia Airlines",
            oman: "Oman Air",
            indigo: "IndiGo",
            spicejet: "SpiceJet",
          };
          return flight.airline === airlineMap[airline];
        });
        if (!airlineMatch) return false;
      }

      return true;
    });
  }, [flights, priceRange, selectedStops, selectedAirlines]);

  const resetFilters = () => {
    setPriceRange([165, 450]);
    setSelectedStops([]);
    setSelectedAirlines([]);
    setSelectedBaggage([]);
    setSelectedArrivalAirports([]);
    // setSelectedDuration([]);
    // setSelectedFlightQuality([]);
    // setSelectedAircraft([]);
    // setSelectedBookingSites([]);
  };

  // Filter component for reuse in both desktop and mobile

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Searching for flights...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Search Form Section */}

        {/* Search Summary */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {searchParams && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{searchParams.origin}</span>
                  <ArrowRight className="h-4 w-4" />
                  <span className="font-semibold">
                    {searchParams.destination}
                  </span>
                </div>
                <div className="text-gray-500 text-sm sm:text-base">
                  {searchParams.departureDate}
                </div>
                <div className="text-gray-500 text-sm sm:text-base">
                  {searchParams.passenger.adult +
                    searchParams.passenger.children +
                    searchParams.passenger.infant}{" "}
                  Passenger(s)
                </div>
              </div>
            )}
            <Dialog>
              <DialogTrigger className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2.5 ml-auto px-4 rounded-full">
                Search {searchParams ? "Again" : "Flights"}
              </DialogTrigger>
              <DialogContent className="p-0 md:min-w-[800px]">
                <SearchForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <FilterContent
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedStops={selectedStops}
                  setSelectedStops={setSelectedStops}
                  selectedAirlines={selectedAirlines}
                  setSelectedAirlines={setSelectedAirlines}
                  selectedBaggage={selectedBaggage}
                  setSelectedBaggage={setSelectedBaggage}
                  selectedArrivalAirports={selectedArrivalAirports}
                  setSelectedArrivalAirports={setSelectedArrivalAirports}
                  resetFilters={resetFilters}
                />
              </CardContent>
            </Card>
          </div>

          {/* Flight Results */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Button and Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold">
                {filteredFlights.length} of {flights.length} Result
              </h2>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Mobile Filter Button */}
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="lg:hidden flex items-center gap-2 flex-1 sm:flex-none bg-transparent"
                    >
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-[90%] overflow-y-auto px-3"
                  >
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        selectedStops={selectedStops}
                        setSelectedStops={setSelectedStops}
                        selectedAirlines={selectedAirlines}
                        setSelectedAirlines={setSelectedAirlines}
                        selectedBaggage={selectedBaggage}
                        setSelectedBaggage={setSelectedBaggage}
                        selectedArrivalAirports={selectedArrivalAirports}
                        setSelectedArrivalAirports={setSelectedArrivalAirports}
                        resetFilters={resetFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort Options */}
                <div className="flex space-x-2 flex-1 sm:flex-none">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-blue-600 text-white text-xs sm:text-sm px-2 sm:px-4"
                  >
                    Recommended
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm px-2 sm:px-4 bg-transparent"
                  >
                    Fastest
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm px-2 sm:px-4 bg-transparent"
                  >
                    Cheapest
                  </Button>
                </div>
              </div>
            </div>

            {/* Flight Cards */}
            <div className="space-y-4">
              {filteredFlights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  {...flight}
                  handleBookFlight={handleBookFlight}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredFlights.length === 0 && (
              <div className="text-center py-12">
                <Plane className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No flights found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <Button onClick={resetFilters} variant="outline">
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
