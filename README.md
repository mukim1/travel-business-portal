# Travel Business Portal

A modern travel booking platform built with Next.js, React, and TypeScript. This application allows users to search for flights, view results, and complete bookings with a seamless user experience.

## 🚀 Features

### Core Functionality
- **Home Page** with hero section, search bar, popular packages, and footer
- **Flight Search** with dynamic filtering and real-time results
- **Search Results** displaying flight cards with airline details, times, stops, and pricing
- **User Authentication** with secure login/logout functionality
- **Booking Flow** with passenger information forms and booking management
- **Responsive Design** optimized for desktop and mobile devices

### Advanced Features
- **Dynamic Passenger Forms** based on selected passenger count (adults, children, infants)
- **Smart Filtering** by price, airlines, stops, and flight class
- **Real-time Pricing** with dynamic price calculations
- **Session Management** with secure authentication
- **Loading States** and error handling throughout the application
- **Mobile-First Design** with responsive navigation and filters

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Authentication**: Custom JWT-based auth system
- **Date Handling**: date-fns
- **Form Handling**: React Hook Form patterns

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── booking/           # Booking flow pages
│   ├── login/             # Authentication pages
│   ├── search/            # Search results page
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/                # Base UI components (buttons, cards, etc.)
│   ├── Header.tsx         # Navigation header
│   └── SearchForm.tsx     # Flight search form
├── contexts/              # React Context providers
│   ├── AuthContext.tsx    # Authentication state
│   └── SearchContext.tsx  # Search state management
├── lib/                   # Utility functions and services
│   ├── auth.ts            # Authentication utilities
│   ├── flight-service.ts  # Flight data service
│   └── utils.ts           # General utilities
└── styles/                # Global styles
    └── globals.css        # Tailwind CSS imports
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd travel-booking-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your environment variables:
   ```env
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

For testing the authentication system, use these demo accounts:

```
Email: demo@example.com
Password: password123

Email: john@example.com
Password: password123

Email: jane@example.com
Password: password123
```

## 🎯 Usage Guide

### Searching for Flights
1. **Home Page**: Use the search form to enter your travel details
   - Select origin and destination airports
   - Choose departure date (and return date for round trips)
   - Specify number of passengers (adults, children, infants)

2. **Search Results**: Browse available flights with filtering options
   - Filter by price range, airlines, number of stops
   - Sort by price, duration, or departure time
   - View flight details including amenities and baggage allowance

### Booking Process
1. **Select Flight**: Click "Book Now" on your preferred flight
2. **Authentication**: Log in or create an account if not already authenticated
3. **Passenger Details**: Fill out forms for each passenger
   - Adult passengers require full details including passport
   - Children forms have simplified requirements
   - Infant details are optional for some fields
4. **Review & Confirm**: Review booking details and confirm

### Mobile Experience
- **Responsive Design**: Optimized for all screen sizes
- **Mobile Filters**: Slide-out filter panel on mobile devices
- **Touch-Friendly**: Large buttons and easy navigation
- **Fast Loading**: Optimized performance for mobile networks

## 🏗 Architecture Decisions

### State Management
- **Context API**: Used for global state (auth, search) to avoid prop drilling
- **Local State**: Component-level state for UI interactions
- **Session Storage**: Persistent auth state across browser sessions

### Component Design
- **Atomic Design**: Small, reusable components with single responsibilities
- **Composition**: Higher-order components for complex functionality
- **TypeScript**: Full type safety throughout the application

### Performance Optimizations
- **Server Components**: Leveraging Next.js 14 App Router for better performance
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component for optimized loading
- **Lazy Loading**: Components loaded on demand

### User Experience
- **Loading States**: Skeleton screens and spinners for better perceived performance
- **Error Handling**: Graceful error messages and fallback UI
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

The application uses Tailwind CSS responsive utilities for consistent behavior across devices.

## 🚀 Deployment

### Vercel