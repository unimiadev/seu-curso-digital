import LandingPage from './pages/Home/LandingPage';
import CourseDetailsPage from './pages/Courses/CourseDetailsPage';
import CoursesMainPage from './pages/Courses/CoursesMainPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cursos" element={<CoursesMainPage />} />
        <Route path="/courses/:slug" element={<CourseDetailsPage />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/termos" element={<Terms />} />
        <Route path="/politica-de-privacidade" element={<Privacy />} />
      </Routes>
    </Router>
  );
};

export default App; 