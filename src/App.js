import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Home/LandingPage";
import CoursesPage from "./pages/Courses/CoursesMainPage";
import CourseDetailsPage from "./pages/Courses/CourseDetails/CourseDetailsPage";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sobre-nos" element={<About />} />
        <Route path="/cursos" element={<CoursesPage />} />
        <Route path="/cursos/:id" element={<CourseDetailsPage />} />
        <Route path="/termos-de-uso" element={<Terms />} />
        <Route path="/fale-conosco" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
