import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Globe,
  Sun,
  Moon,
  Loader2,
  Map,
  Search,
  X,
  MapPin,
  Users,
  Globe2,
} from "lucide-react";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
const Home = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [region, setRegion] = useState("");

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setDarkMode(savedTheme === "dark");
  }, []);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = !darkMode ? "dark" : "light";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    
  };

  const handleRegionChange = async (e) => {
    const selectedRegion = e.target.value;
    setRegion(selectedRegion);
    setSearch("");
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `https://restcountries.com/v3.1/region/${selectedRegion}`
      );
      setCountries(res.data);
      toast.success(
        `${res.data.length} countries in ${selectedRegion} loaded.`,
        {
          autoClose: 2000,
        }
      );
    } catch (err) {
      setCountries([]);
      setError("Failed to fetch countries by region.");
      toast.error("Failed to fetch countries by region.", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  // Handle country search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setCountries([]);
      setError("Please enter a country name.");
      toast.error("Please enter a country name.", { autoClose: 3000 });
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${search}`
      );
      setCountries(res.data);
      toast.success(
        `${res.data.length} ${
          res.data.length === 1 ? "country" : "countries"
        } found!`,
        {
          autoClose: 2000,
        }
      );
    } catch (err) {
      setCountries([]);
      setError("No countries found. Try another search.");
      toast.error("No countries found. Try another search.", {
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle card click
  const handleCardClick = (country) => {
    toast.info(`Exploring ${country.name.common}`, { autoClose: 2000 });
    navigate(`/country/${country.cca3}`);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode
          ? "bg-gradient-to-br from-gray-800 via-blue-900 to-gray-900 text-white"
          : "bg-gradient-to-br from-blue-100 via-white to-blue-300 text-gray-800"
      } transition-colors duration-300`}
    >
      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center bg-white/10 backdrop-blur-md sticky top-0 z-10">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Globe
            size={24}
            className={darkMode ? "text-white" : "text-blue-600"}
          />
          Country Explorer
        </h1>
        <nav className="flex gap-4">
          
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg font-medium  hover:bg-white/20 transition duration-300"
          >
            Exit App
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg font-medium  hover:bg-white/20 transition duration-300"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            {darkMode ? "Light" : "Dark"}
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center flex-grow p-6 max-w-5xl mx-auto w-full">
        {/* Hero Section */}
        <section className="text-center mb-8 animate-fadeIn">
          <Map
            size={48}
            className={`mx-auto mb-4 ${
              darkMode ? "text-white" : "text-blue-600"
            } animate-spin-slow`}
            aria-hidden="true"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
            Search Countries Worldwide
          </h1>
          <p className="text-lg sm:text-xl mt-2 max-w-lg mx-auto opacity-80">
            Find detailed information about any country, from flags to
            populations.
          </p>
        </section>

        {/* Region Filter */}
        <div className="w-full max-w-md mb-4">
          <select
            value={region}
            onChange={handleRegionChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select a Region</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-md mx-auto mb-8 animate-scaleIn"
        >
          <div
            className={`flex items-center rounded-lg p-2 shadow-md ${
              darkMode ? "bg-white/10" : "bg-white"
            }`}
          >
            <Search
              size={24}
              className={`ml-2 ${darkMode ? "text-gray-300" : "text-gray-500"}`}
              aria-hidden="true"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a country..."
              className="w-full bg-transparent px-3 py-2 focus:outline-none"
              aria-label="Search for a country"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mr-2"
                aria-label="Clear search"
              >
                <X size={20} />
              </button>
            )}
          </div>
          <button
            type="submit"
            className={`mt-2 w-full py-2 rounded-lg font-medium transition cursor-pointer ${
              darkMode
                ? "bg-white text-blue-600 hover:bg-blue-100"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            aria-label="Search countries"
          >
            Search
          </button>
        </form>

        {/* Feedback and Results */}
        {loading && (
          <div className="flex flex-col items-center mt-8 animate-pulse">
            <Loader2
              size={40}
              className={`animate-spin ${
                darkMode ? "text-white" : "text-blue-600"
              }`}
            />
            <p className="mt-2 text-lg">Searching for countries...</p>
          </div>
        )}

        {error && (
          <p
            className={`mt-4 text-lg font-medium px-4 py-2 rounded-lg animate-fadeIn ${
              darkMode
                ? "bg-red-900/50 text-red-200"
                : "bg-red-100 text-red-600"
            }`}
          >
            {error}
          </p>
        )}

        {countries.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full animate-fadeIn">
            {countries.map((country) => (
              <div
                key={country.cca3}
                className={`p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer ${
                  darkMode ? "bg-white/10 text-white" : "bg-white text-gray-800"
                }`}
                onClick={() => handleCardClick(country)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleCardClick(country)}
                aria-label={`View details for ${country.name.common}`}
              >
                <img
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  className="w-full h-32 object-cover rounded-md mb-4 shadow-sm"
                  loading="lazy"
                />
                <h3
                  className="text-xl font-semibold mb-3 truncate"
                  title={country.name.common}
                >
                  {country.name.common}
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Capital: {country.capital?.[0] || "N/A"}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Globe2 size={16} />
                    <span>Region: {country.region}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Users size={16} />
                    <span>
                      Population: {country.population.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && countries.length === 0 && !search && (
          <p className="mt-8 text-lg opacity-80 animate-fadeIn">
            Start by searching for a country above!
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 text-center bg-white/10 backdrop-blur-md">
        <p className="text-sm opacity-80">
          © 2025 Country Explorer. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
