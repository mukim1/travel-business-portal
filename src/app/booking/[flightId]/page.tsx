"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useSearch } from "@/contexts/SearchContext"
import { useAuth } from "@/contexts/AuthContext"
import { Plane, Calendar } from "lucide-react"

interface PassengerForm {
  title: string
  firstName: string
  lastName: string
  gender: string
  dateOfBirth: string
  country: string
  email: string
  phone: string
  passportNumber?: string
}

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const { flights, searchParams } = useSearch()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [passengerForms, setPassengerForms] = useState<PassengerForm[]>([])

  const flightId = params.flightId as string
  const flight = flights.find((f) => f.id === flightId)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (!flight || !searchParams) {
      router.push("/search")
      return
    }

    // Initialize passenger forms
    const forms: PassengerForm[] = []

    // Adult forms
    for (let i = 0; i < searchParams.passenger.adult; i++) {
      forms.push({
        title: "",
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        country: "",
        email: "",
        phone: "",
        passportNumber: "",
      })
    }

    // Children forms
    for (let i = 0; i < searchParams.passenger.children; i++) {
      forms.push({
        title: "",
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        country: "",
        email: "",
        phone: "",
        passportNumber: "", // Optional for children
      })
    }

    setPassengerForms(forms)
  }, [user, flight, searchParams, router])

  const updatePassengerForm = (index: number, field: keyof PassengerForm, value: string) => {
    const updatedForms = [...passengerForms]
    updatedForms[index] = { ...updatedForms[index], [field]: value }
    setPassengerForms(updatedForms)
  }

  const handleNext = () => {
    // Validate forms
    const isValid = passengerForms.every(
      (form) =>
        form.title &&
        form.firstName &&
        form.lastName &&
        form.gender &&
        form.dateOfBirth &&
        form.country &&
        form.email &&
        form.phone,
    )

    if (!isValid) {
      alert("Please fill in all required fields")
      return
    }

    setCurrentStep(2)
  }

  const handleBooking = () => {
    // Process booking
    alert("Booking confirmed! You will receive a confirmation email shortly.")
    router.push("/")
  }

  if (!flight || !searchParams) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <p>Flight not found. Please search again.</p>
        </div>
      </div>
    )
  }

  const totalPassengers = searchParams.passenger.adult + searchParams.passenger.children + searchParams.passenger.infant
  const basePrice = flight.price * totalPassengers
  const taxes = Math.round(basePrice * 0.15)
  const totalPrice = basePrice + taxes

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${currentStep >= 1 ? "text-blue-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                1
              </div>
              <span className="ml-2 font-medium">Details</span>
            </div>
            <div className="w-16 h-px bg-gray-300"></div>
            <div className={`flex items-center ${currentStep >= 2 ? "text-blue-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              <span className="ml-2 font-medium">Review</span>
            </div>
            <div className="w-16 h-px bg-gray-300"></div>
            <div className="flex items-center text-gray-400">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200">3</div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Flight Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Plane className="h-5 w-5" />
                      <span>Flight Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="font-semibold text-lg">{flight.departure.time}</div>
                          <div className="text-sm text-gray-500">{flight.departure.code}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-px bg-gray-300"></div>
                          <Plane className="h-4 w-4 text-gray-400" />
                          <div className="w-8 h-px bg-gray-300"></div>
                        </div>
                        <div>
                          <div className="font-semibold text-lg">{flight.arrival.time}</div>
                          <div className="text-sm text-gray-500">{flight.arrival.code}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{flight.airline}</div>
                        <div className="text-sm text-gray-500">{flight.duration}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Passenger Forms */}
                {passengerForms.map((form, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>
                          Passenger Info{" "}
                          <Badge variant={index < searchParams.passenger.adult ? "default" : "secondary"}>
                            {index < searchParams.passenger.adult
                              ? `Adult ${index + 1}`
                              : `Child ${index - searchParams.passenger.adult + 1}`}
                          </Badge>
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor={`title-${index}`}>Title*</Label>
                          <Select onValueChange={(value) => updatePassengerForm(index, "title", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Title" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mr">Mr.</SelectItem>
                              <SelectItem value="mrs">Mrs.</SelectItem>
                              <SelectItem value="ms">Ms.</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor={`firstName-${index}`}>First Name*</Label>
                          <Input
                            id={`firstName-${index}`}
                            value={form.firstName}
                            onChange={(e) => updatePassengerForm(index, "firstName", e.target.value)}
                            placeholder="First Name"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`lastName-${index}`}>Last Name*</Label>
                          <Input
                            id={`lastName-${index}`}
                            value={form.lastName}
                            onChange={(e) => updatePassengerForm(index, "lastName", e.target.value)}
                            placeholder="Last Name"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`gender-${index}`}>Gender*</Label>
                          <Select onValueChange={(value) => updatePassengerForm(index, "gender", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor={`dob-${index}`}>Date of Birth*</Label>
                          <Input
                            id={`dob-${index}`}
                            type="date"
                            value={form.dateOfBirth}
                            onChange={(e) => updatePassengerForm(index, "dateOfBirth", e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor={`country-${index}`}>Country*</Label>
                          <Select onValueChange={(value) => updatePassengerForm(index, "country", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="bd">Bangladesh</SelectItem>
                              <SelectItem value="in">India</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor={`email-${index}`}>Email*</Label>
                          <Input
                            id={`email-${index}`}
                            type="email"
                            value={form.email}
                            onChange={(e) => updatePassengerForm(index, "email", e.target.value)}
                            placeholder="Email Address"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`phone-${index}`}>Phone Number*</Label>
                          <Input
                            id={`phone-${index}`}
                            value={form.phone}
                            onChange={(e) => updatePassengerForm(index, "phone", e.target.value)}
                            placeholder="Phone Number"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`passport-${index}`}>
                            Passport Number{index >= searchParams.passenger.adult ? "" : "*"}
                          </Label>
                          <Input
                            id={`passport-${index}`}
                            value={form.passportNumber}
                            onChange={(e) => updatePassengerForm(index, "passportNumber", e.target.value)}
                            placeholder="Passport Number"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-end">
                  <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 px-8">
                    Next
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Booking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Flight Details</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{flight.airline}</div>
                              <div className="text-sm text-gray-500">
                                {flight.departure.code} → {flight.arrival.code}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                {flight.departure.time} - {flight.arrival.time}
                              </div>
                              <div className="text-sm text-gray-500">{searchParams.departureDate}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Passengers</h3>
                        <div className="space-y-2">
                          {passengerForms.map((form, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex justify-between">
                                <span>
                                  {form.title} {form.firstName} {form.lastName}
                                </span>
                                <Badge variant={index < searchParams.passenger.adult ? "default" : "secondary"}>
                                  {index < searchParams.passenger.adult ? "Adult" : "Child"}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={() => setCurrentStep(1)}>
                        Back
                      </Button>
                      <Button onClick={handleBooking} className="bg-blue-600 hover:bg-blue-700 px-8">
                        Confirm Booking
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar - Itinerary Details */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Itinerary Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {flight.departure.code} - {flight.arrival.code}
                    </span>
                    <Badge variant="outline">{flight.id}</Badge>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Departure:</span>
                      <span className="text-sm">{searchParams.departureDate}, 5:05 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Arrival:</span>
                      <span className="text-sm">{searchParams.departureDate}, 6:05 PM</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="font-semibold">Price Summary</h3>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Adult ({searchParams.passenger.adult})</span>
                        <div className="text-right">
                          <div className="text-sm">Base fare: ${flight.price * searchParams.passenger.adult}</div>
                          <div className="text-xs text-gray-500">
                            Tax: ${Math.round(flight.price * searchParams.passenger.adult * 0.15)}
                          </div>
                        </div>
                      </div>

                      {searchParams.passenger.children > 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm">Child ({searchParams.passenger.children})</span>
                          <div className="text-right">
                            <div className="text-sm">
                              Base fare: ${flight.price * searchParams.passenger.children * 0.8}
                            </div>
                            <div className="text-xs text-gray-500">
                              Tax: ${Math.round(flight.price * searchParams.passenger.children * 0.8 * 0.15)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold">
                      <span>Total Base Amount</span>
                      <span>${basePrice}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm">Total Tax & Fees</span>
                      <span className="text-sm">${taxes}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm">Discount Amount</span>
                      <span className="text-sm">$0</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Gross Amount</span>
                      <span>${totalPrice}</span>
                    </div>

                    <div className="flex justify-between text-lg font-bold text-blue-600">
                      <span>Offer Amount</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
