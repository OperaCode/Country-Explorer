// src/hooks/useWikipediaSummary.js
import { useState, useEffect } from "react";
import axios from "axios";

const useWikipediaSummary = (topic) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      if (!topic) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
            topic
          )}`
        );
        setSummary(res.data.extract);
      } catch (err) {
        console.error("Error fetching Wikipedia summary:", err);
        setSummary("No fun fact available at the moment.");
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [topic]);

  return { summary, loading };
};

export default useWikipediaSummary;
