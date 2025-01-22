import React from 'react';
import Header from '../../components/layout/Header';
import HeroSlider from './HeroSlider';
import FeatureCards from './FeatureCards';
import CourseAccess from './CourseAccess';
import CategoryCards from './CategoryCards';
import UserReviews from './UserReviews';
import Footer from '../../components/layout/Footer';
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