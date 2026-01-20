import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Granite from "./pages/granite";
import Loose from "./pages/loose";
import Steel from "./pages/steel";
import Rcc from "./pages/rcc";
import Dataset from "./pages/dataset";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      {/* Navbar stays on every page */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/granite" element={<Granite />} />
        <Route path="/loose" element={<Loose />} />
        <Route path="/steel" element={<Steel />} />
        <Route path="/rcc" element={<Rcc />} />
        <Route path="/dataset" element={<Dataset />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
