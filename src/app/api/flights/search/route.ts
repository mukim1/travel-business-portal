import { type NextRequest, NextResponse } from "next/server";
import { flightService } from "@/lib/flight-service";
import { corsHeaders } from "@/lib/middleware";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const origin = searchParams.get("origin")?.toUpperCase();
    const destination = searchParams.get("destination")?.toUpperCase();
    const departureDate = searchParams.get("departureDate");
    const passengers = Number.parseInt(searchParams.get("passengers") || "1");
    const minPrice = searchParams.get("minPrice")
      ? Number.parseFloat(searchParams.get("minPrice")!)
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? Number.parseFloat(searchParams.get("maxPrice")!)
      : undefined;
    const airlines = searchParams.get("airlines")?.split(",").filter(Boolean);
    const stops = searchParams
      .get("stops")
      ?.split(",")
      .map(Number)
      .filter((n) => !isNaN(n));
    // const flightClass = searchParams.get("class");

    if (!origin || !destination || !departureDate) {
      return NextResponse.json(
        { error: "Origin, destination, and departure date are required" },
        { status: 400, headers: corsHeaders() }
      );
    }

    if (passengers < 1 || passengers > 9) {
      return NextResponse.json(
        { error: "Passengers must be between 1 and 9" },
        { status: 400, headers: corsHeaders() }
      );
    }

    // Convert date format if needed
    let formattedDate = departureDate;
    if (departureDate.includes(" ")) {
      const date = new Date(departureDate);
      if (!isNaN(date.getTime())) {
        formattedDate = date.toISOString().split("T")[0];
      }
    }

    const flights = await flightService.searchFlights({
      origin,
      destination,
      departureDate: formattedDate,
      passengers,
      minPrice,
      maxPrice,
      airlines,
      stops,
    //   class: flightClass,
    });

    // Transform the data to match frontend expectations
    const transformedFlights = flights.map((flight) => ({
      id: flight.id,
      airline: flight.airline.name,
      logo: flight.airline.logo,
      departure: {
        time: flight.departure.time,
        airport: flight.departure.airport.name,
        code: flight.departure.airport.code,
        terminal: flight.departure.terminal,
      },
      arrival: {
        time: flight.arrival.time,
        airport: flight.arrival.airport.name,
        code: flight.arrival.airport.code,
        terminal: flight.arrival.terminal,
      },
      duration: `${Math.floor(flight.duration / 60)}h ${
        flight.duration % 60
      }min`,
      stops: flight.stops,
      price: flight.basePrice,
      currency: flight.currency,
      refundable: flight.refundable,
      class: flight.class,
      aircraft: flight.aircraft,
      flightNumber: flight.flightNumber,
      baggage: flight.baggage,
      amenities: flight.amenities,
      seatAvailability: flight.seatAvailability,
    }));

    return NextResponse.json(
      {
        success: true,
        flights: transformedFlights,
        total: transformedFlights.length,
        searchParams: {
          origin,
          destination,
          departureDate: formattedDate,
          passengers,
        },
      },
      { status: 200, headers: corsHeaders() }
    );
  } catch (error) {
    console.error("Flight search error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
        success: false,
      },
      { status: 500, headers: corsHeaders() }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders() });
}
