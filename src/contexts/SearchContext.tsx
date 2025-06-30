"use client";

import { Flight, SearchContextType, SearchParams } from "@/types/search-flight";
import type React from "react";
import { createContext, useContext, useState } from "react";

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchFlights = async (params: SearchParams) => {
    setIsLoading(true);
    setSearchParams(params);

    try {
      // Comprehensive dummy flight data
      const mockFlights: Flight[] = [
        // Singapore Airlines Flights
        {
          id: "SQ001",
          airline: "Singapore Airlines",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "12:10",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "15:30",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "3h 20min",
          stops: 0,
          price: 110,
          currency: "USD",
          refundable: true,
          class: "Business Class",
          aircraft: "Boeing 777-300ER",
          flightNumber: "SQ 447",
        },
        {
          id: "SQ002",
          airline: "Singapore Airlines",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "08:15",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "14:45",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 1,
          price: 324,
          currency: "USD",
          refundable: true,
          class: "Economy",
          aircraft: "Airbus A350-900",
          flightNumber: "SQ 449",
        },
        {
          id: "SQ003",
          airline: "Singapore Airlines",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "23:45",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "06:15",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 1,
          price: 289,
          currency: "USD",
          refundable: true,
          class: "Economy",
          aircraft: "Boeing 787-10",
          flightNumber: "SQ 451",
        },

        // Qatar Airways Flights
        {
          id: "QR001",
          airline: "Qatar Airways",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "12:10",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "15:30",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "3h 20min",
          stops: 0,
          price: 435,
          currency: "USD",
          refundable: false,
          class: "Business Class",
          aircraft: "Airbus A350-1000",
          flightNumber: "QR 639",
        },
        {
          id: "QR002",
          airline: "Qatar Airways",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "14:20",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "20:50",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 1,
          price: 349,
          currency: "USD",
          refundable: false,
          class: "Economy",
          aircraft: "Boeing 787-9",
          flightNumber: "QR 641",
        },
        {
          id: "QR003",
          airline: "Qatar Airways",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "18:55",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "01:25",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 1,
          price: 298,
          currency: "USD",
          refundable: true,
          class: "Economy",
          aircraft: "Airbus A330-300",
          flightNumber: "QR 643",
        },

        // Emirates Flights
        {
          id: "EK001",
          airline: "Emirates",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "12:10",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "15:30",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "3h 20min",
          stops: 0,
          price: 330,
          currency: "USD",
          refundable: true,
          class: "Business Class",
          aircraft: "Airbus A380-800",
          flightNumber: "EK 585",
        },
        {
          id: "EK002",
          airline: "Emirates",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "22:30",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "05:00",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 0,
          price: 450,
          currency: "USD",
          refundable: true,
          class: "Business Class",
          aircraft: "Boeing 777-300ER",
          flightNumber: "EK 587",
        },
        {
          id: "EK003",
          airline: "Emirates",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "16:40",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "23:10",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 1,
          price: 275,
          currency: "USD",
          refundable: false,
          class: "Economy",
          aircraft: "Boeing 777-200LR",
          flightNumber: "EK 589",
        },

        // Saudi Airlines Flights
        {
          id: "SV001",
          airline: "Saudi Airlines",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "12:10",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "15:30",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "3h 20min",
          stops: 0,
          price: 200,
          currency: "USD",
          refundable: false,
          class: "Business Class",
          aircraft: "Boeing 787-9",
          flightNumber: "SV 805",
        },
        {
          id: "SV002",
          airline: "Saudi Airlines",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "09:25",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "15:55",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 1,
          price: 185,
          currency: "USD",
          refundable: false,
          class: "Economy",
          aircraft: "Airbus A330-300",
          flightNumber: "SV 807",
        },

        // ANA All Nippon Airways Flights
        {
          id: "NH001",
          airline: "ANA All Nippon",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "16:45",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "23:15",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 1,
          price: 280,
          currency: "USD",
          refundable: true,
          class: "Economy",
          aircraft: "Boeing 787-8",
          flightNumber: "NH 817",
        },
        {
          id: "NH002",
          airline: "ANA All Nippon",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "11:30",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "18:00",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 1,
          price: 315,
          currency: "USD",
          refundable: true,
          class: "Premium Economy",
          aircraft: "Boeing 777-300ER",
          flightNumber: "NH 819",
        },

        // Cathay Pacific Flights
        {
          id: "CX001",
          airline: "Cathay Pacific",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "10:30",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "17:00",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 2,
          price: 250,
          currency: "USD",
          refundable: false,
          class: "Economy",
          aircraft: "Airbus A350-900",
          flightNumber: "CX 711",
        },
        {
          id: "CX002",
          airline: "Cathay Pacific",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "20:15",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "02:45",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 2,
          price: 225,
          currency: "USD",
          refundable: false,
          class: "Economy",
          aircraft: "Boeing 777-300",
          flightNumber: "CX 713",
        },

        // Air France Flights
        {
          id: "AF001",
          airline: "Air France",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "18:15",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "01:45",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "7h 30min",
          stops: 1,
          price: 380,
          currency: "USD",
          refundable: true,
          class: "Business Class",
          aircraft: "Boeing 787-9",
          flightNumber: "AF 1395",
        },
        {
          id: "AF002",
          airline: "Air France",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "13:40",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "21:10",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "7h 30min",
          stops: 1,
          price: 295,
          currency: "USD",
          refundable: true,
          class: "Economy",
          aircraft: "Airbus A350-900",
          flightNumber: "AF 1397",
        },

        // Turkish Airlines Flights
        {
          id: "TK001",
          airline: "Turkish Airlines",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "01:20",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "07:50",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 1,
          price: 265,
          currency: "USD",
          refundable: true,
          class: "Economy",
          aircraft: "Boeing 737 MAX 8",
          flightNumber: "TK 713",
        },
        {
          id: "TK002",
          airline: "Turkish Airlines",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "15:30",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "22:00",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 1,
          price: 340,
          currency: "USD",
          refundable: true,
          class: "Business Class",
          aircraft: "Airbus A330-300",
          flightNumber: "TK 715",
        },

        // Etihad Airways Flights
        {
          id: "EY001",
          airline: "Etihad Airways",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "07:45",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "14:15",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 1,
          price: 310,
          currency: "USD",
          refundable: true,
          class: "Economy",
          aircraft: "Boeing 787-9",
          flightNumber: "EY 237",
        },
        {
          id: "EY002",
          airline: "Etihad Airways",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "19:25",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "01:55",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 1,
          price: 395,
          currency: "USD",
          refundable: true,
          class: "Business Class",
          aircraft: "Airbus A350-1000",
          flightNumber: "EY 239",
        },

        // Lufthansa Flights
        {
          id: "LH001",
          airline: "Lufthansa",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "14:50",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "21:20",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 2,
          price: 285,
          currency: "USD",
          refundable: true,
          class: "Economy",
          aircraft: "Airbus A340-600",
          flightNumber: "LH 761",
        },

        // British Airways Flights
        {
          id: "BA001",
          airline: "British Airways",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "21:10",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "03:40",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 1,
          price: 355,
          currency: "USD",
          refundable: true,
          class: "Premium Economy",
          aircraft: "Boeing 787-9",
          flightNumber: "BA 161",
        },

        // KLM Royal Dutch Airlines
        {
          id: "KL001",
          airline: "KLM Royal Dutch",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "12:35",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "19:05",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 2,
          price: 270,
          currency: "USD",
          refundable: false,
          class: "Economy",
          aircraft: "Boeing 777-200ER",
          flightNumber: "KL 875",
        },

        // Thai Airways Flights
        {
          id: "TG001",
          airline: "Thai Airways",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "17:20",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "23:50",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 1,
          price: 305,
          currency: "USD",
          refundable: true,
          class: "Economy",
          aircraft: "Airbus A350-900",
          flightNumber: "TG 321",
        },

        // Malaysia Airlines
        {
          id: "MH001",
          airline: "Malaysia Airlines",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "06:30",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "13:00",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 1,
          price: 245,
          currency: "USD",
          refundable: false,
          class: "Economy",
          aircraft: "Boeing 737-800",
          flightNumber: "MH 195",
        },

        // Oman Air
        {
          id: "WY001",
          airline: "Oman Air",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "03:15",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "09:45",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 1,
          price: 235,
          currency: "USD",
          refundable: false,
          class: "Economy",
          aircraft: "Boeing 787-8",
          flightNumber: "WY 141",
        },

        // IndiGo (Budget Option)
        {
          id: "6E001",
          airline: "IndiGo",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "05:45",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "12:15",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 2,
          price: 175,
          currency: "USD",
          refundable: false,
          class: "Economy",
          aircraft: "Airbus A320neo",
          flightNumber: "6E 1463",
        },

        // SpiceJet (Budget Option)
        {
          id: "SG001",
          airline: "SpiceJet",
          logo: "/placeholder.svg?height=40&width=40",
          departure: {
            time: "22:50",
            airport: "Hazrat Shahjalal International",
            code: "DAC",
          },
          arrival: {
            time: "05:20",
            airport: "Dubai International Airport",
            code: "DXB",
          },
          duration: "6h 30min",
          stops: 2,
          price: 165,
          currency: "USD",
          refundable: false,
          class: "Economy",
          aircraft: "Boeing 737-800",
          flightNumber: "SG 171",
        },
      ];

      setFlights(mockFlights);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchParams,
        flights,
        setSearchParams,
        searchFlights,
        isLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
