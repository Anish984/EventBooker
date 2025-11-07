import React, { useState } from "react";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-background min-h-screen text-text font-serif">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-surface border-b border-border shadow-sm flex justify-between items-center px-6 py-3 z-30">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide text-accent">ClassicSite</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {["Home", "About", "Services", "Contact"].map((item) => (
            <button
              key={item}
              className="text-text hover:text-accent transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-surface border-r border-border transform transition-transform duration-300 z-40 md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-border text-lg font-semibold text-accent">
          Menu
        </div>
        <div className="flex flex-col space-y-2 p-4">
          {["Home", "About", "Services", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => setMenuOpen(false)}
              className="text-left px-3 py-2 rounded hover:bg-background transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black opacity-40 md:hidden z-30"
        ></div>
      )}

      {/* Main Content */}
      <main className="pt-20 px-6">
        <h2 className="text-3xl font-bold text-accent mb-4">
          Welcome to ClassicSite
        </h2>
        <p className="text-subtleText max-w-xl">
          A timeless, responsive design using a universal Tailwind theme. Resize
          your screen to see the sidebar menu on mobile.
        </p>

        <div className="mt-6 flex gap-3">
          <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-hover transition">
            Get Started
          </button>
          <button className="border border-accent text-accent px-4 py-2 rounded-md hover:bg-accent hover:text-white transition">
            Learn More
          </button>
        </div>
      </main>
    </div>
  );
}
