import { Star } from "lucide-react";
import Image from "next/image";

export const DestinationCard = ({
  destination,
}: {
  destination: {
    id: number;
    name: string;
    rating: number;
    price: string;
    description: string;
    image: string;
  };
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image container with Next.js optimized images */}
      <div className="relative h-48 w-full">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Card content section */}
      <div className="p-4">
        {/* Destination name and rating row */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {destination.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {destination.rating}
            </span>
          </div>
        </div>

        {/* Description text */}
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {destination.description}
        </p>

        {/* Price and booking button row */}
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900">
            ${destination.price}
          </div>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
