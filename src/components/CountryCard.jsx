import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Loader2,
  Globe,
  MapPin,
  Users,
  Globe2,
  Flag,
  Moon,
  Sun,
} from "lucide-react";
import useTheme from "../hooks/useTheme";
import useWikipediaSummary from "../hooks/wikiSummary";

const CountryCard = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await axios.get(
          `https://restcountries.com/v3.1/alpha/${code}`
        );
        setCountry(res.data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [code]);

  // Fetch Wikipedia summary as fun fact
  const { summary: funFact, loading: funFactLoading } = useWikipediaSummary(
    country?.name.common
  );

  if (loading || funFactLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 size={50} className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (!country) {
    return <p className="text-center mt-8">Country not found.</p>;
  }

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode
          ? "bg-gradient-to-br from-gray-800 via-blue-900 to-gray-900 text-white"
          : "bg-gradient-to-br from-blue-100 via-white to-blue-300 text-gray-800"
      } transition-colors duration-300`}
    >
      {/* Header */}
      <header className="w-full py-6 px-6 flex justify-between items-center bg-white/10 backdrop-blur-md sticky top-0 z-10">
        <h1 className="md:text-2xl text-xl font-bold tracking-tight flex items-center gap-2">
          <Globe
            size={24}
            className={darkMode ? "text-white" : "text-blue-600"}
          />
          Country Explorer
        </h1>
        <nav className="flex md:gap-2">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="flex items-center cursor-pointer gap-1 md:gap-2 px-2 py-2 rounded-lg font-medium w-full  hover:bg-white/20 transition duration-300"
          >
            <ArrowLeft size={20}/>
            Back
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center cursor-pointer gap-1 md:gap-2 px-2 py-2 rounded-lg font-medium  hover:bg-white/20 transition duration-300"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            {darkMode ? "Light" : "Dark"}
          </button>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center p-4 animate-fadeIn">
        <div className="bg-zinc-600 dark:bg-gray-600/50 backdrop-blur-md rounded-2xl shadow-2xl max-w-xl w-full p-6 transform transition duration-500 hover:scale-[1.02]">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
              <img
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
                className="w-52 h-36 object-cover rounded"
              />
            </div>
            <h2 className="mt-4 text-3xl font-extrabold text-center">
              {country.name.common}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-200 text-lg mb-6">
            <p className="flex items-center gap-2">
              <MapPin size={18} /> Capital: {country.capital?.[0] || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <Globe2 size={18} /> Region: {country.region}
            </p>
            <p className="flex items-center gap-2">
              <Flag size={18} /> Subregion: {country.subregion}
            </p>
            <p className="flex items-center gap-2">
              <Users size={18} /> Population:{" "}
              {country.population.toLocaleString()}
            </p>
            <p className="sm:col-span-2">
              <strong>Languages:</strong>{" "}
              {country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A"}
            </p>
            <p className="sm:col-span-2">
              <strong>Currencies:</strong>{" "}
              {country.currencies
                ? Object.values(country.currencies)
                    .map((c) => c.name)
                    .join(", ")
                : "N/A"}
            </p>
            <p className="sm:col-span-2">
              <strong>Timezones:</strong> {country.timezones.join(", ")}
            </p>
          </div>

          <div 
          className="mt-4 p-4 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-800 dark:to-blue-900 text-gray-800 dark:text-gray-100 border-l-4 border-cyan-400 rounded shadow-inner animate-slideInUp"
          // className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 text-gray-100 border-l-4 border-blue-400 rounded shadow-inner animate-slideInUp"
          >
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              🌟 Fun Fact
            </h3>
            <p>{funFact}</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 text-center bg-white/10 backdrop-blur-md">
        <p className="text-sm opacity-80">
          © 2025 Country Explorer. All rights reserved.
        </p>
      </footer>

      {/* Animations */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CountryCard;
