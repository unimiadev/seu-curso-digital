import React from 'react';
import Header from '../components/layout/Header';
import HeroSlider from '../components/home/HeroSlider';
import FeatureCards from '../components/home/FeatureCards';
import CourseAccess from '../components/home/CourseAccess';
import CategoryCards from '../components/home/CategoryCards';
import UserReviews from '../components/home/UserReviews';
import Footer from '../components/layout/Footer';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <HeroSlider />
      <FeatureCards />
      <CourseAccess />
      <CategoryCards />
      <UserReviews />
      <Footer />
    </div>
  );
};

export default LandingPage; 