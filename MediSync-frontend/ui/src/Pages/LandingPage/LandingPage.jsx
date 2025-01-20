import React from 'react';
import './LandingPage.scss';
// Import individual sections
import Navbar from '../../components/common/Navbar/Navbar';
import Banner from '../../components/Banner/Banner';
import Services from '../../components/Services/Services';
import Location from '../../components/Location/Location';
import WellnessGuide from '../../components/WellnessGuide/WellnessGuide';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <Banner />
      <Services />
      <Location />
      <WellnessGuide />
    </div>
  );
};

export default LandingPage;
