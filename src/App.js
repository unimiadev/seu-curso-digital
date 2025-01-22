import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sobre-nos" element={<About />} />
        <Route path="/cursos" element={<HomePage />} />
        <Route path="/cursos/:id" element={<CourseDetailsPage />} />
        <Route path="/termos-de-uso" element={<Terms />} />
        <Route path="/fale-conosco" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
