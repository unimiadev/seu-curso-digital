import React from 'react';
import Header from '../components/layout/Header';
import CourseSection from '../components/courses/CourseSection';
import Footer from '../components/layout/Footer';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <CourseSection />
      <Footer />
    </div>
  );
};

export default HomePage; 