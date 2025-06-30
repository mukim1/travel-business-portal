import SearchForm from "@/components/SearchForm";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white pt-32"
      // style={{
      //   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1583846468921-3a4b26998d6e?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      // }}
    >
      <Image
        src="https://images.unsplash.com/photo-1583846468921-3a4b26998d6e?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hero Background"
        fill
        className="object-cover object-center"
        priority
        style={{
          filter: "brightness(0.5)",
          zIndex: -1, // Ensure the image is behind the text
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <span className="text-orange-400 text-lg font-medium">
            Bambang, Indonesia
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Explore The World Around You
        </h1>
        <p className="text-lg md:text-xl mb-16 max-w-3xl mx-auto opacity-90 text-gray-200">
          We&apos;ll help you find the places of your dreams. Plan your trip and
          explore amazing destinations around the world.
        </p>

        {/* Search Form - Translated Down */}
        <div className="transform translate-y-32">
          <SearchForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;
