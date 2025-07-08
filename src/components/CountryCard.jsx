import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Loader2 } from 'lucide-react';

const CountryCard = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [funFact, setFunFact] = useState('');

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
        setCountry(res.data[0]);

        // Random fun fact
        const facts = [
          "This country has no rivers!",
          "It's home to the world's largest desert.",
          "It has the world's highest waterfall.",
          "Its flag has a unique meaning for each color.",
          "This country spans two continents!"
        ];
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        setFunFact(randomFact);

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
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 size={40} className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (!country) {
    return <p className="text-center mt-8">Country not found.</p>;
  }

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-4 text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
      >
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <div className="bg-white dark:bg-gray-800 dark:text-white shadow rounded-md p-6">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mb-4">
          <img
            src={country.flags.svg}
            alt={`${country.name.common} flag`}
            className="w-48 h-32 object-cover rounded mx-auto"
          />
        </div>

        <h2 className="text-3xl font-bold mb-4 text-center">{country.name.common}</h2>

        <div className="space-y-2">
          <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Subregion:</strong> {country.subregion}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
          <p><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
          <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-400">
          <h3 className="text-xl font-semibold mb-2">🌟 Fun Fact</h3>
          <p>{funFact}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
