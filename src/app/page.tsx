"use client";
import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Shield,
  Play,
  Search,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SearchForm from "@/components/SearchForm";
import Header from "@/components/Header";
import { DestinationCard } from "@/views/page-home/DestinationCard";
import PackageSection from "@/views/page-home/package-section";
import Hero from "@/views/page-home/hero";

export default function HomePage() {
  const destinations = [
    {
      id: 1,
      name: "Wates Beach",
      rating: 4.9,
      price: "122.23",
      description:
        "Tour package 3 days 2 nights with a good and friendly tour guide.",
      // image: "/images/wates-beach.jpg", // Replace with your actual image paths
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Nglayur Beach",
      rating: 4.7,
      price: "132.65",
      description:
        "Tour package 3 days 2 nights with a good and friendly tour guide.",
      // image: "/images/nglayur-beach.jpg",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Megah Asri",
      rating: 4.6,
      price: "148.43",
      description:
        "Tour package 3 days 2 nights with a good and friendly tour guide.",
      // image: "/images/megah-asri.jpg",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Karangjahe",
      rating: 4.6,
      price: "119.23",
      description:
        "Tour package 3 days 2 nights with a good and friendly tour guide.",
      // image: "/images/karangjahe.jpg",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      name: "Caruban Beach",
      rating: 4.7,
      price: "128.29",
      description:
        "Tour package 3 days 2 nights with a good and friendly tour guide.",
      // image: "/images/caruban-beach.jpg",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      name: "Mbrumbung",
      rating: 4.5,
      price: "182.33",
      description:
        "Tour package 3 days 2 nights with a good and friendly tour guide.",
      // image: "/images/mbrumbung.jpg",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Paris, France",
      image:
        "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Travel Guide",
    },
    {
      id: 2,
      title: "Bali, Indonesia",
      image:
        "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
      category: "Destination",
    },
    {
      id: 3,
      title: "Borobudur, Indonesia",
      image:
        "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400&h=300&fit=crop",
      category: "Culture",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section - Matches the design image exactly */}
      <Hero />

      {/* Popular Packages */}
      <PackageSection />

      {/* Value Propositions */}
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
                Choose from hundreds of carefully selected destinations
                worldwide, each offering unique experiences and adventures
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

      {/* Video Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div
              className="relative h-[500px] bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=600&fit=crop')`,
              }}
            >
              <div className="text-center text-white">
                <div className="bg-white/20 backdrop-blur-md w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer hover:bg-white/30 transition-all duration-300 transform hover:scale-110 shadow-lg">
                  <Play className="h-12 w-12 text-white ml-1" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Discover Amazing Places
                </h3>
                <p className="text-xl opacity-90 max-w-md mx-auto">
                  Watch our incredible travel experiences and get inspired for
                  your next adventure
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Recommendations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <div className="mb-6 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Travel Recommendations
              </h2>
              <p className="text-xl text-gray-600">
                Handpicked destinations just for you
              </p>
            </div>
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Latest Articles About Travel
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover travel tips, destination guides, and inspiring stories
              from around the world to help plan your perfect journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-2xl mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Discover the beauty and culture of this amazing destination
                    with our comprehensive travel guide and insider tips.
                  </p>
                  <div className="flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Read More →
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              View All Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto my-24 px-4 sm:px-6 lg:px-8">
        <section className="py-20  bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Subscribe To Get The Latest News About Us
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Stay updated with our latest offers, travel tips, and exclusive
              deals delivered straight to your inbox
            </p>

            <div className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 bg-white/10 backdrop-blur-md p-2 rounded-full">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-white text-gray-900 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-500"
                />
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <h3 className="text-3xl font-bold mb-6 text-blue-400">Khyeran</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Your trusted travel partner for amazing adventures around the
                world. Creating unforgettable memories since 2020.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 cursor-pointer transition-colors duration-300">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 cursor-pointer transition-colors duration-300">
                  <span className="text-sm font-bold">in</span>
                </div>
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 cursor-pointer transition-colors duration-300">
                  <span className="text-sm font-bold">t</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">About</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    News
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    History
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Contact Us</h4>
              <ul className="space-y-3">
                <li className="text-gray-400">Call Center</li>
                <li className="text-gray-400">Email Us</li>
                <li className="text-gray-400">Support</li>
                <li className="text-gray-400">Help Center</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                &copy; 2024 Khyeran. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
