// types/booking.ts
export interface PassengerForm {
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  country: string;
  email: string;
  phone: string;
  passportNumber?: string;
}

export interface BookingState {
  currentStep: number;
  passengers: PassengerForm[];
  isSubmitting: boolean;
  errors: Record<string, string>;
}

export type BookingAction =
  | { type: "SET_STEP"; payload: number }
  | {
      type: "UPDATE_PASSENGER";
      payload: { index: number; field: keyof PassengerForm; value: string };
    }
  | { type: "INIT_PASSENGERS"; payload: PassengerForm[] }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_ERRORS"; payload: Record<string, string> }
  | {
      type: "SET_ERROR";
      payload: {
        passengerIndex: number;
        errorField: keyof PassengerForm;
        errorMessage: string;
      };
    }
  | { type: "CLEAR_ERRORS" };
