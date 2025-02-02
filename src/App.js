import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Home/LandingPage";
import CoursesPage from "./pages/Courses/CoursesMainPage";
import CourseDetailsPage from "./pages/Courses/CourseDetails/CourseDetailsPage";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sobre-nos" element={<About />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:slug" element={<CourseDetailsPage />} />
          <Route path="/termos-de-uso" element={<Terms />} />
          <Route path="/fale-conosco" element={<Contact />} />
          <Route path="/politica-de-privacidade" element={<Privacy />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
