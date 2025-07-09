import { useState, useEffect } from "react";

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const isDark = savedTheme === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode ? "dark" : "light";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return { darkMode, toggleTheme };
};

export default useTheme;
