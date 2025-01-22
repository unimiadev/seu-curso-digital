import React from 'react';
import Header from '../../components/layout/Header';
import CourseSection from './CourseSection';
import Footer from '../../components/layout/Footer';

const CoursesMainPage = () => {
  return (
    <div className="home-page">
      <Header />
      <CourseSection />
      <Footer />
    </div>
  );
};

export default CoursesMainPage; 