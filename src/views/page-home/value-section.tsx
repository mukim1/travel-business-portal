import React from "react";
import { MapPin, Calendar, Shield } from "lucide-react";

const ValueSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Top Value From Us For You
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide the best service and experience for your journey with
            unmatched quality and care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <MapPin className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Lot Of Choices
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Choose from hundreds of carefully selected destinations worldwide,
              each offering unique experiences and adventures
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Best Tour Guide
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Professional and experienced guides who are passionate about
              sharing their knowledge and making your trip memorable
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Calendar className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Easy Booking
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Simple, secure, and hassle-free booking process with flexible
              payment options and instant confirmation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
