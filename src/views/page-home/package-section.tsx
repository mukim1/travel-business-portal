import React from "react";
import Image from "next/image";

const PackageSection = () => {
  return (
    <section className="py-20 bg-white mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Popular Package
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our most loved destinations and create unforgettable
            memories with carefully curated travel experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {popularPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                  fill
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-xl mb-2">{pkg.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{pkg.price}</span>
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {pkg.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
            Browse All Packages
          </button>
        </div>
      </div>
    </section>
  );
};

export default PackageSection;

const popularPackages = [
  {
    id: 1,
    title: "Bali, Indonesia",
    image:
      "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$299",
    duration: "5 Days",
  },
  {
    id: 2,
    title: "Paris, France",
    image:
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=775&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$599",
    duration: "7 Days",
  },
  {
    id: 3,
    title: "Tokyo, Japan",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    price: "$799",
    duration: "6 Days",
  },
  {
    id: 4,
    title: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
    price: "$499",
    duration: "4 Days",
  },
];
