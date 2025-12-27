import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1 container mx-auto px-4 py-12">

        {/* HERO SECTION */}
        <Hero />

        {/* PROJECTS + ABOUT + CONTACT */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT SIDE — PROJECTS */}
          <div className="w-full">
            <Projects />
          </div>

          {/* RIGHT SIDE — ABOUT + CONTACT */}
          <div className="flex flex-col gap-12 w-full">
            <About />
            <Contact />
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} — Khushi Poddar
      </footer>
    </div>
  );
}
