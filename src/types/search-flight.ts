export interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passenger: {
    adult: number;
    children: number;
    infant: number;
  };
  tripType: "one-way" | "round-trip";
}

export interface Flight {
  id: string;
  airline: string;
  logo: string;
  departure: {
    time: string;
    airport: string;
    code: string;
  };
  arrival: {
    time: string;
    airport: string;
    code: string;
  };
  duration: string;
  stops: number;
  price: number;
  currency: string;
  refundable: boolean;
  class: string;
  aircraft: string;
  flightNumber: string;
}

export interface SearchContextType {
  searchParams: SearchParams | null;
  flights: Flight[];
  setSearchParams: (params: SearchParams) => void;
  searchFlights: (params: SearchParams) => Promise<void>;
  isLoading: boolean;
}
