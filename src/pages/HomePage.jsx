import React from 'react';
import Header from '../components/Header';
import CourseSection from '../components/CourseSection';
import Footer from '../components/Footer';

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