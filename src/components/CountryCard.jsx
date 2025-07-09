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
} from "lucide-react";

const CountryCard = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [funFact, setFunFact] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setDarkMode(savedTheme === "dark");

    const fetchCountry = async () => {
      try {
        const res = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
        setCountry(res.data[0]);

        const facts = [
          "This country has no rivers!",
          "It's home to the world's largest desert.",
          "It has the world's highest waterfall.",
          "Its flag has a unique meaning for each color.",
          "This country spans two continents!",
        ];
        setFunFact(facts[Math.floor(Math.random() * facts.length)]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [code]);

  if (loading) {
    return (
      <div className={`flex justify-center items-center min-h-screen ${darkMode ? "bg-gradient-to-br from-gray-800 via-blue-900 to-gray-900 text-white" : "bg-gradient-to-br from-blue-100 via-white to-blue-300 text-gray-800"}`}>
        <Loader2 size={50} className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (!country) {
    return <p className="text-center mt-8">Country not found.</p>;
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gradient-to-br from-gray-800 via-blue-900 to-gray-900 text-white" : "bg-gradient-to-br from-blue-100 via-white to-blue-300 text-gray-800"} transition-colors duration-300`}>
      
      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center bg-white/10 backdrop-blur-md sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:underline font-medium transition"
        >
          <ArrowLeft size={20} /> Back
        </button>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Globe size={20} className="text-blue-600" /> Country Details
        </h1>
        <div></div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center p-6 animate-fadeIn">
        <div className="bg-white/30 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl max-w-2xl w-full p-8 transform transition duration-500 hover:scale-[1.02]">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
              <img
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
                className="w-52 h-36 object-cover rounded"
              />
            </div>
            <h2 className="mt-4 text-3xl font-extrabold text-center">{country.name.common}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 text-lg mb-6">
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
              <Users size={18} /> Population: {country.population.toLocaleString()}
            </p>
            <p className="sm:col-span-2">
              <strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
            </p>
            <p className="sm:col-span-2">
              <strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(", ") : "N/A"}
            </p>
            <p className="sm:col-span-2">
              <strong>Timezones:</strong> {country.timezones.join(", ")}
            </p>
          </div>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-400 rounded shadow-inner animate-slideInUp">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              🌟 Fun Fact
            </h3>
            <p>{funFact}</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 text-center bg-white/10 backdrop-blur-md">
        <p className="text-sm opacity-80">© 2025 Country Explorer. All rights reserved.</p>
      </footer>

      {/* Animations */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CountryCard;
