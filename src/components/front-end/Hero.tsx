"use client";

import Image from "next/image";

const Hero = () => {
  return (
    <div className="bg-[#E3EDF6] mt-4">
      <div className="container grid md:grid-cols-2 py-8">
        <div className="flex items-center">
          <div className="max-w-[450px] space-y-4"> 

            <h1 className="text-topHeadingPrimary font-bold text-4xl md:text-5xl">
              SELLECT YOUR KOREAN AUTO PARTS
            </h1>

            <h3 className="text-2xl font-['Oregano',cursive]">
              Exclusive offer <span className="text-red-600">-10%</span> of every first time buyer
            </h3>

            <a
              className="inline-block bg-white rounded-md px-6 py-3 hover:bg-accent hover:text-white"
              href="/contact"
            >
              Contact Us
            </a>

          </div>
        </div>

        <div>
          <Image
            src="/bg1.png"
            alt="hero"
            width={500}  // Set appropriate width
            height={400} // Set appropriate height
            className="ml-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
