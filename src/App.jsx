import "./App.css";
import Landing from "./Pages/LandingPage";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import CountryCard from "./components/CountryCard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/country/:code" element={<CountryCard />} />
      </Routes>
    </>
  );
}

export default App;
