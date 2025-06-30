// hooks/useBookingForm.ts
import { useReducer, useCallback } from "react";
import { z } from "zod";
import type {
  BookingState,
  BookingAction,
  PassengerForm,
} from "@/types/booking";

const passengerSchema = z.object({
  title: z.string().min(1, "Title is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  country: z.string().min(1, "Country is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  passportNumber: z.string().optional(),
});

const bookingReducer = (
  state: BookingState,
  action: BookingAction
): BookingState => {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };

    case "UPDATE_PASSENGER":
      const { index, field, value } = action.payload;
      const updatedPassengers = [...state.passengers];
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        [field]: value,
      };
      return { ...state, passengers: updatedPassengers };

    case "INIT_PASSENGERS":
      return { ...state, passengers: action.payload };

    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };

    case "SET_ERRORS":
      return { ...state, errors: action.payload };

    case "SET_ERROR":
      const { passengerIndex, errorField, errorMessage } = action.payload;
      return {
        ...state,
        errors: {
          ...state.errors,
          [`passenger-${passengerIndex}-${errorField}`]: errorMessage,
        },
      };

    case "CLEAR_ERRORS":
      return { ...state, errors: {} };

    default:
      return state;
  }
};

export const useBookingForm = () => {
  const [state, dispatch] = useReducer(bookingReducer, {
    currentStep: 1,
    passengers: [],
    isSubmitting: false,
    errors: {},
  });

  const initializePassengers = useCallback(
    (adultCount: number, childCount: number) => {
      const passengers: PassengerForm[] = [];

      // Create adult passenger forms
      for (let i = 0; i < adultCount; i++) {
        passengers.push({
          title: "",
          firstName: "",
          lastName: "",
          gender: "",
          dateOfBirth: "",
          country: "",
          email: "",
          phone: "",
          passportNumber: "",
        });
      }

      // Create child passenger forms
      for (let i = 0; i < childCount; i++) {
        passengers.push({
          title: "",
          firstName: "",
          lastName: "",
          gender: "",
          dateOfBirth: "",
          country: "",
          email: "",
          phone: "",
          passportNumber: "", // Optional for children
        });
      }

      dispatch({ type: "INIT_PASSENGERS", payload: passengers });
    },
    []
  );

  const updatePassenger = useCallback(
    (index: number, field: keyof PassengerForm, value: string) => {
      dispatch({ type: "UPDATE_PASSENGER", payload: { index, field, value } });
      dispatch({
        type: "SET_ERROR",
        payload: { passengerIndex: index, errorField: field, errorMessage: "" },
      });
    },
    []
  );

  const validatePassengers = useCallback(
    (adultCount: number) => {
      const errors: Record<string, string> = {};

      state.passengers.forEach((passenger, index) => {
        try {
          // Adults require passport number, children don't
          const schema =
            index < adultCount
              ? passengerSchema.extend({
                  passportNumber: z
                    .string()
                    .min(1, "Passport number is required"),
                })
              : passengerSchema;

          schema.parse(passenger);
        } catch (error) {
          if (error instanceof z.ZodError) {
            error.errors.forEach((err) => {
              errors[`passenger-${index}-${err.path[0]}`] = err.message;
            });
          }
        }
      });

      dispatch({ type: "SET_ERRORS", payload: errors });
      return Object.keys(errors).length === 0;
    },
    [state.passengers]
  );

  const nextStep = useCallback(() => {
    dispatch({ type: "SET_STEP", payload: state.currentStep + 1 });
  }, [state.currentStep]);

  const prevStep = useCallback(() => {
    dispatch({ type: "SET_STEP", payload: state.currentStep - 1 });
  }, [state.currentStep]);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    dispatch({ type: "SET_SUBMITTING", payload: isSubmitting });
  }, []);

  const clearErrors = useCallback(() => {
    dispatch({ type: "CLEAR_ERRORS" });
  }, []);

  return {
    state,
    initializePassengers,
    updatePassenger,
    validatePassengers,
    nextStep,
    prevStep,
    setSubmitting,
    clearErrors,
  };
};
