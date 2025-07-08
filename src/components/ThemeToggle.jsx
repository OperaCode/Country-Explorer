import React from "react";

const ThemeToggle = () => {
  const toggleTheme = () => {
    const newTheme = !darkMode ? "dark" : "light";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg font-medium  hover:bg-white/20 transition duration-300"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      {darkMode ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeToggle;
