// Flight data service with dynamic pricing and availability

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
}

export interface Airline {
  code: string;
  name: string;
  logo: string;
}

export interface FlightData {
  id: string;
  flightNumber: string;
  airline: Airline;
  departure: {
    airport: Airport;
    time: string;
    terminal?: string;
  };
  arrival: {
    airport: Airport;
    time: string;
    terminal?: string;
  };
  duration: number; // in minutes
  stops: number;
  aircraft: string;
  class: string;
  basePrice: number;
  currency: string;
  refundable: boolean;
  baggage: {
    cabin: string;
    checked: string;
  };
  amenities: string[];
  seatAvailability: {
    economy: number;
    business: number;
    first: number;
  };
}

// Static data for airports and airlines
const AIRPORTS: Record<string, Airport> = {
  DAC: {
    code: "DAC",
    name: "Hazrat Shahjalal International Airport",
    city: "Dhaka",
    country: "Bangladesh",
    timezone: "Asia/Dhaka",
  },
  DXB: {
    code: "DXB",
    name: "Dubai International Airport",
    city: "Dubai",
    country: "UAE",
    timezone: "Asia/Dubai",
  },
  DOH: {
    code: "DOH",
    name: "Hamad International Airport",
    city: "Doha",
    country: "Qatar",
    timezone: "Asia/Qatar",
  },
  SIN: {
    code: "SIN",
    name: "Singapore Changi Airport",
    city: "Singapore",
    country: "Singapore",
    timezone: "Asia/Singapore",
  },
  BKK: {
    code: "BKK",
    name: "Suvarnabhumi Airport",
    city: "Bangkok",
    country: "Thailand",
    timezone: "Asia/Bangkok",
  },
  KUL: {
    code: "KUL",
    name: "Kuala Lumpur International Airport",
    city: "Kuala Lumpur",
    country: "Malaysia",
    timezone: "Asia/Kuala_Lumpur",
  },
  IST: {
    code: "IST",
    name: "Istanbul Airport",
    city: "Istanbul",
    country: "Turkey",
    timezone: "Europe/Istanbul",
  },
  LHR: {
    code: "LHR",
    name: "Heathrow Airport",
    city: "London",
    country: "UK",
    timezone: "Europe/London",
  },
  CDG: {
    code: "CDG",
    name: "Charles de Gaulle Airport",
    city: "Paris",
    country: "France",
    timezone: "Europe/Paris",
  },
  JFK: {
    code: "JFK",
    name: "John F. Kennedy International Airport",
    city: "New York",
    country: "USA",
    timezone: "America/New_York",
  },
};

const AIRLINES: Record<string, Airline> = {
  SQ: {
    code: "SQ",
    name: "Singapore Airlines",
    logo: "/placeholder.svg?height=40&width=40",
  },
  QR: {
    code: "QR",
    name: "Qatar Airways",
    logo: "/placeholder.svg?height=40&width=40",
  },
  EK: {
    code: "EK",
    name: "Emirates",
    logo: "/placeholder.svg?height=40&width=40",
  },
  TK: {
    code: "TK",
    name: "Turkish Airlines",
    logo: "/placeholder.svg?height=40&width=40",
  },
  BA: {
    code: "BA",
    name: "British Airways",
    logo: "/placeholder.svg?height=40&width=40",
  },
  AF: {
    code: "AF",
    name: "Air France",
    logo: "/placeholder.svg?height=40&width=40",
  },
  LH: {
    code: "LH",
    name: "Lufthansa",
    logo: "/placeholder.svg?height=40&width=40",
  },
  KL: {
    code: "KL",
    name: "KLM Royal Dutch",
    logo: "/placeholder.svg?height=40&width=40",
  },
};

// Base flight templates
const FLIGHT_TEMPLATES: Omit<FlightData, "id" | "departure" | "arrival">[] = [
  {
    flightNumber: "SQ447",
    airline: AIRLINES.SQ,
    duration: 200,
    stops: 0,
    aircraft: "Boeing 777-300ER",
    class: "Business Class",
    basePrice: 850,
    currency: "USD",
    refundable: true,
    baggage: { cabin: "7kg", checked: "30kg" },
    amenities: ["WiFi", "Entertainment", "Meals", "Priority Boarding"],
    seatAvailability: { economy: 0, business: 12, first: 0 },
  },
  {
    flightNumber: "QR639",
    airline: AIRLINES.QR,
    duration: 195,
    stops: 0,
    aircraft: "Airbus A350-1000",
    class: "Business Class",
    basePrice: 920,
    currency: "USD",
    refundable: false,
    baggage: { cabin: "7kg", checked: "30kg" },
    amenities: ["WiFi", "Entertainment", "Meals", "Lounge Access"],
    seatAvailability: { economy: 0, business: 8, first: 0 },
  },
  {
    flightNumber: "EK585",
    airline: AIRLINES.EK,
    duration: 200,
    stops: 0,
    aircraft: "Airbus A380-800",
    class: "Business Class",
    basePrice: 780,
    currency: "USD",
    refundable: true,
    baggage: { cabin: "7kg", checked: "40kg" },
    amenities: ["WiFi", "Entertainment", "Meals", "Shower Spa", "Bar"],
    seatAvailability: { economy: 0, business: 15, first: 4 },
  },
  {
    flightNumber: "SQ449",
    airline: AIRLINES.SQ,
    duration: 390,
    stops: 1,
    aircraft: "Airbus A350-900",
    class: "Economy",
    basePrice: 420,
    currency: "USD",
    refundable: true,
    baggage: { cabin: "7kg", checked: "23kg" },
    amenities: ["Entertainment", "Meals"],
    seatAvailability: { economy: 45, business: 0, first: 0 },
  },
  {
    flightNumber: "QR641",
    airline: AIRLINES.QR,
    duration: 390,
    stops: 1,
    aircraft: "Boeing 787-9",
    class: "Economy",
    basePrice: 380,
    currency: "USD",
    refundable: false,
    baggage: { cabin: "7kg", checked: "23kg" },
    amenities: ["Entertainment", "Meals"],
    seatAvailability: { economy: 52, business: 0, first: 0 },
  },
  {
    flightNumber: "EK589",
    airline: AIRLINES.EK,
    duration: 390,
    stops: 1,
    aircraft: "Boeing 777-200LR",
    class: "Economy",
    basePrice: 350,
    currency: "USD",
    refundable: false,
    baggage: { cabin: "7kg", checked: "23kg" },
    amenities: ["Entertainment", "Meals"],
    seatAvailability: { economy: 38, business: 0, first: 0 },
  },
  {
    flightNumber: "TK713",
    airline: AIRLINES.TK,
    duration: 390,
    stops: 1,
    aircraft: "Boeing 737 MAX 8",
    class: "Economy",
    basePrice: 320,
    currency: "USD",
    refundable: true,
    baggage: { cabin: "8kg", checked: "23kg" },
    amenities: ["Entertainment", "Meals"],
    seatAvailability: { economy: 28, business: 0, first: 0 },
  },
  {
    flightNumber: "BA161",
    airline: AIRLINES.BA,
    duration: 450,
    stops: 1,
    aircraft: "Boeing 787-9",
    class: "Premium Economy",
    basePrice: 580,
    currency: "USD",
    refundable: true,
    baggage: { cabin: "7kg", checked: "23kg" },
    amenities: ["WiFi", "Entertainment", "Meals", "Extra Legroom"],
    seatAvailability: { economy: 0, business: 18, first: 0 },
  },
  {
    flightNumber: "LH761",
    airline: AIRLINES.LH,
    duration: 420,
    stops: 2,
    aircraft: "Airbus A340-600",
    class: "Economy",
    basePrice: 290,
    currency: "USD",
    refundable: true,
    baggage: { cabin: "8kg", checked: "23kg" },
    amenities: ["Entertainment", "Meals"],
    seatAvailability: { economy: 22, business: 0, first: 0 },
  },
  {
    flightNumber: "KL875",
    airline: AIRLINES.KL,
    duration: 450,
    stops: 2,
    aircraft: "Boeing 777-200ER",
    class: "Economy",
    basePrice: 275,
    currency: "USD",
    refundable: false,
    baggage: { cabin: "7kg", checked: "23kg" },
    amenities: ["Entertainment", "Meals"],
    seatAvailability: { economy: 31, business: 0, first: 0 },
  },
];

export class FlightService {
  private generateDynamicPrice(
    basePrice: number,
    date: string,
    demand = 0.5
  ): number {
    const searchDate = new Date(date);
    const today = new Date();
    const daysUntilDeparture = Math.ceil(
      (searchDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    let multiplier = 1.0;

    // Price increases as departure date approaches
    if (daysUntilDeparture <= 7) {
      multiplier += 0.4;
    } else if (daysUntilDeparture <= 14) {
      multiplier += 0.2;
    } else if (daysUntilDeparture <= 30) {
      multiplier += 0.1;
    }

    // Weekend premium
    const dayOfWeek = searchDate.getDay();
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      // Friday or Saturday
      multiplier += 0.15;
    }

    // Demand-based pricing
    multiplier += (demand - 0.5) * 0.3;

    // Random market fluctuation
    multiplier += (Math.random() - 0.5) * 0.1;

    return Math.round(basePrice * multiplier);
  }

  private generateFlightTimes(
    duration: number,
    stops: number
  ): { departure: string; arrival: string } {
    console.log(stops)
    const baseHours = [6, 8, 10, 12, 14, 16, 18, 20, 22];
    const departureHour =
      baseHours[Math.floor(Math.random() * baseHours.length)];
    const departureMinute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45

    const totalMinutes = duration + Math.random() * 60; // Add some randomness
    const arrivalTime = new Date();
    arrivalTime.setHours(departureHour, departureMinute, 0, 0);
    arrivalTime.setMinutes(arrivalTime.getMinutes() + totalMinutes);

    const formatTime = (date: Date) => {
      return date.toTimeString().substring(0, 5);
    };

    return {
      departure: `${departureHour.toString().padStart(2, "0")}:${departureMinute
        .toString()
        .padStart(2, "0")}`,
      arrival: formatTime(arrivalTime),
    };
  }

  private updateSeatAvailability(
    flight: FlightData,
    passengers: number
  ): FlightData {
    const availability = { ...flight.seatAvailability };
    // const demand = Math.random();
    console.log(passengers)

    // Simulate booking activity
    if (flight.class === "Economy") {
      availability.economy = Math.max(
        0,
        availability.economy - Math.floor(Math.random() * 10)
      );
    } else if (flight.class === "Business Class") {
      availability.business = Math.max(
        0,
        availability.business - Math.floor(Math.random() * 3)
      );
    }

    return { ...flight, seatAvailability: availability };
  }

  async searchFlights(params: {
    origin: string;
    destination: string;
    departureDate: string;
    passengers: number;
    minPrice?: number;
    maxPrice?: number;
    airlines?: string[];
    stops?: number[];
    class?: string;
  }): Promise<FlightData[]> {
    // Simulate API delay
    await new Promise((resolve) =>
      setTimeout(resolve, 800 + Math.random() * 1200)
    );

    const {
      origin,
      destination,
      departureDate,
      passengers,
      minPrice,
      maxPrice,
      airlines,
      stops,
    } = params;

    if (!AIRPORTS[origin] || !AIRPORTS[destination]) {
      throw new Error("Invalid airport codes");
    }

    // Generate flights based on templates
    let flights = FLIGHT_TEMPLATES.map((template, index) => {
      const times = this.generateFlightTimes(template.duration, template.stops);
      const demand = Math.random();
      const dynamicPrice = this.generateDynamicPrice(
        template.basePrice,
        departureDate,
        demand
      );

      const flight: FlightData = {
        ...template,
        id: `${template.flightNumber}_${departureDate}_${index}`,
        departure: {
          airport: AIRPORTS[origin],
          time: times.departure,
          terminal:
            Math.random() > 0.5
              ? `T${Math.floor(Math.random() * 3) + 1}`
              : undefined,
        },
        arrival: {
          airport: AIRPORTS[destination],
          time: times.arrival,
          terminal:
            Math.random() > 0.5
              ? `T${Math.floor(Math.random() * 3) + 1}`
              : undefined,
        },
        basePrice: dynamicPrice,
      };

      return this.updateSeatAvailability(flight, passengers);
    });

    // Apply filters
    if (minPrice !== undefined) {
      flights = flights.filter((f) => f.basePrice >= minPrice);
    }

    if (maxPrice !== undefined) {
      flights = flights.filter((f) => f.basePrice <= maxPrice);
    }

    if (airlines && airlines.length > 0) {
      flights = flights.filter((f) => airlines.includes(f.airline.code));
    }

    if (stops && stops.length > 0) {
      flights = flights.filter((f) => stops.includes(f.stops));
    }

    // Check seat availability
    flights = flights.filter((flight) => {
      const totalAvailable =
        flight.seatAvailability.economy +
        flight.seatAvailability.business +
        flight.seatAvailability.first;
      return totalAvailable >= passengers;
    });

    // Sort by price
    flights.sort((a, b) => a.basePrice - b.basePrice);

    // Add some randomness to simulate real-world variations
    flights = flights
      .sort(() => Math.random() - 0.5)
      .slice(0, 15 + Math.floor(Math.random() * 10));

    return flights;
  }

  async getFlightById(id: string): Promise<FlightData | null> {
    // Simulate API delay
    await new Promise((resolve) =>
      setTimeout(resolve, 300 + Math.random() * 500)
    );

    // Extract flight number from ID
    const flightNumber = id.split("_")[0];
    const template = FLIGHT_TEMPLATES.find(
      (t) => t.flightNumber === flightNumber
    );

    if (!template) {
      return null;
    }

    // Generate a consistent flight for this ID
    const times = this.generateFlightTimes(template.duration, template.stops);
    const price = this.generateDynamicPrice(
      template.basePrice,
      new Date().toISOString().split("T")[0]
    );

    return {
      ...template,
      id,
      departure: {
        airport: AIRPORTS.DAC, // Default for demo
        time: times.departure,
      },
      arrival: {
        airport: AIRPORTS.DXB, // Default for demo
        time: times.arrival,
      },
      basePrice: price,
    };
  }

  async getPopularRoutes(): Promise<
    { origin: Airport; destination: Airport; averagePrice: number }[]
  > {
    return [
      { origin: AIRPORTS.DAC, destination: AIRPORTS.DXB, averagePrice: 450 },
      { origin: AIRPORTS.DAC, destination: AIRPORTS.DOH, averagePrice: 380 },
      { origin: AIRPORTS.DAC, destination: AIRPORTS.SIN, averagePrice: 520 },
      { origin: AIRPORTS.DAC, destination: AIRPORTS.BKK, averagePrice: 280 },
      { origin: AIRPORTS.DAC, destination: AIRPORTS.KUL, averagePrice: 320 },
    ];
  }

  async getAirports(): Promise<Airport[]> {
    return Object.values(AIRPORTS);
  }

  async getAirlines(): Promise<Airline[]> {
    return Object.values(AIRLINES);
  }
}

export const flightService = new FlightService();
