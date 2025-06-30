// Main BookingPage component (simplified)
"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useBookingForm } from "@/hooks/useBookingForm";
import { BookingSteps } from "@/views/page-booking/BookingSteps";
import { PassengerForm } from "@/views/page-booking/PassengerForm";
import { FlightDetailsCard } from "@/views/page-booking/FlightDetailsCard";
import { useSearch } from "@/contexts/SearchContext";
import { useAuth } from "@/contexts/AuthContext";
import { BookingSummary } from "@/views/page-booking/BookingSummary";
import { toast } from "sonner";
// ... other imports

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const { flights, searchParams } = useSearch();
  const { user } = useAuth();
  const {
    state,
    initializePassengers,
    updatePassenger,
    validatePassengers,
    nextStep,
    prevStep,
    setSubmitting,
  } = useBookingForm();

  const flightId = params.flightId as string;
  const flight = flights.find((f) => f.id === flightId);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!flight || !searchParams) {
      router.push("/search");
      return;
    }

    // Initialize passenger forms based on search parameters
    initializePassengers(
      searchParams.passenger.adult,
      searchParams.passenger.children
    );
  }, [user, flight, searchParams, router, initializePassengers]);

  const handleNext = async () => {
    const isValid = validatePassengers(
      searchParams ? searchParams.passenger.adult : 0
    );
    if (isValid) {
      nextStep();
    }
  };

  const handleBooking = async () => {
    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success feedback
      toast.success(
        "Booking confirmed! You will receive a confirmation email shortly."
      );
      router.push("/");
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!flight || !searchParams) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <p>Flight not found. Please search again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BookingSteps currentStep={state.currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {state.currentStep === 1 && (
              <div className="space-y-6">
                <FlightDetailsCard flight={flight} />

                {state.passengers.map((passenger, index) => (
                  <PassengerForm
                    key={index}
                    passenger={passenger}
                    index={index}
                    isAdult={index < searchParams.passenger.adult}
                    onUpdate={(field, value) =>
                      updatePassenger(index, field, value)
                    }
                    errors={state.errors}
                  />
                ))}

                <div className="flex justify-end">
                  <Button
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                    disabled={state.isSubmitting}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {state.currentStep === 2 && (
              <div className="space-y-6">
                <BookingSummary
                  flight={flight}
                  passengers={state.passengers}
                  searchParams={searchParams}
                />

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button
                    onClick={handleBooking}
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                    disabled={state.isSubmitting}
                  >
                    {state.isSubmitting ? "Processing..." : "Confirm Booking"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Price summary sidebar would go here */}
        </div>
      </div>
    </div>
  );
}
