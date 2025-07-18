import React from "react";
import { useNavigate } from "react-router-dom";
import { Globe, Sun, Moon, Search, MapPinned } from "lucide-react";
import { motion } from "motion/react";
import useTheme from "../hooks/useTheme";

function LandingPage() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode
          ? "bg-gradient-to-br from-gray-800 via-blue-900 to-gray-900"
          : "bg-gradient-to-br from-blue-100 via-white to-blue-300"
      } text-${darkMode ? "white" : "gray-800"} transition-colors duration-300`}
    >
      {/* Header */}
      <header className="w-full py-6 px-6 flex justify-between items-center bg-white/10 backdrop-blur-md sticky top-0 z-10">
        <h1 className="md:text-2xl text-xl font-bold tracking-tight flex items-center gap-2">
          <Globe size={24} />
          Country Explorer
        </h1>

        {/* Nav buttons */}
        <nav className="flex md:gap-2">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="cursor-pointer flex items-center gap-1 px-1 py-2 text-xs md:text-sm rounded-lg font-medium  hover:bg-white/20 transition duration-300"
            
          >
            <Globe size={20} />
            Get Started
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="cursor-pointer flex items-center gap-1 px-2 py-2 rounded-lg font-medium text-xs md:text-sm hover:bg-white/20 transition duration-300"
            
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            {darkMode ? "Light" : "Dark"}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center animate-fadeIn">
        <motion.div 
         initial={{ scale:0 }}
         whileInView={{ scale:1 }}
         transition={{ duration:0.8,  }}
        className="max-w-4xl">
          {/* Hero Icon */}
          <MapPinned
            size={80}
            className={`mx-auto mb-6 ${
              darkMode ? "text-white" : "text-blue-600"
            } drop-shadow-lg`}
            
          />
          
          {/* Title */}
          <motion.h1
          initial={{ y:-20, opacity:0 }}
          whileInView={{ y:0, opacity:1 }}
          transition={{ duration:0.6, delay:0.3 }}
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Explore the World with Country Explorer <span className="inline-block animate-spin-slow  text-6xl">🌍</span>
          </motion.h1>

          {/* Description */}
          <motion.p
          initial={{ opacity:0 }}
          whileInView={{ opacity:1 }}
          transition={{ duration:0.6, delay:0.7 }}
            className={`text-lg sm:text-xl md:text-2xl mb-8 max-w-lg mx-auto ${
              darkMode ? "text-white opacity-90" : "text-gray-700 opacity-90"
            }`}
          >
           Discover countries, their flags, capitals, populations, and more – now with fascinating fun facts for each country – all in a seamless, interactive experience.
          </motion.p>

          {/* Search Bar Animation */}
          <div className="relative w-full max-w-md mx-auto mb-8">
            <div className="flex items-center bg-white/20 rounded-lg p-2 animate-pulse-slow">
              <Search
                size={24}
                className="text-gray-400 ml-2"
                
              />
              <input
                type="text"
                placeholder="Search for a country..."
                disabled
                className="w-full bg-transparent text-white placeholder-gray-400 px-3 py-2 focus:outline-none"
               
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={() => navigate("/home")}
            className={`flex items-center cursor-pointer gap-2 mx-auto px-8 py-4 rounded-full font-semibold shadow-xl hover:scale-105 transform transition duration-300 ${
              darkMode
                ? "bg-white text-blue-600 hover:bg-blue-100"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            
          >
            <Globe size={20} />
            Start Exploring
          </button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 text-center bg-white/10 backdrop-blur-md">
        <p className="text-sm opacity-80">
          © 2025 Country Explorer. All rights reserved.
        </p>
      </footer>

      {/* Animation Styles */}
      <style jsx="true">{`
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spinSlow 10s linear infinite;
        }
        @keyframes pulseSlow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.6;
          }
        }
        .animate-pulse-slow {
          animation: pulseSlow 5s ease-in-out infinite;
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default LandingPage;
