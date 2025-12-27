import React from "react";
import PixelCard from "./PixelCard"; // ⬅️ your new pixel card component

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

      {/* LEFT — TEXT SECTION */}
      <div className="lg:col-span-2">
        <h1 className="text-4xl md:text-5xl font-bold">
          Hi — I am Khushi Poddar.
        </h1>

        <p className="mt-4 text-lg text-gray-300">
          A student learning to code and currently fighting for my life
          against bugs I created myself. My skills include: forgetting
          semicolons, panic-saving files, and googling error messages
          at lightning speed. One day my code will run on the first try…
          but today is not that day.
        </p>
      </div>

      {/* RIGHT — PIXEL CARD */}
      <div className="w-full flex justify-center">
        <PixelCard />
      </div>

    </section>
  );
}
