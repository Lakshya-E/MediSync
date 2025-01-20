// components/Navbar.js
import React from 'react';
import './Navbar.scss'
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";
import { 
  navigateToSignUp,
  navigateToHome,
  navigateToAboutUs
 } from '../../../store/actions/navigateAction';

const Navbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigateToHome(navigate);
  }

  const handleAboutUsClick = () => {
    navigateToAboutUs(navigate);
  }

  const handleSignupClick = () => {
    navigateToSignUp(navigate);
  }

  return (
    <div className="navbar-section">
      <div className='navbar__logo'>
        <span onClick={handleHomeClick}>MediSync</span>
      </div>
      <div className='navbar__navlink_section'>
        <div className='navbar__medisync_features'>
          <span onClick={handleHomeClick}>Home</span>
          <span>Services</span>
          <span>For Medical Professionals</span>
          <span>Health Library</span>
          <span>Request Appointments</span>
          <span onClick={handleAboutUsClick}>Who we are</span>
        </div>
        <div className='navbar__user_info'>
          <Button>Login</Button>
          <Button onClick={handleSignupClick}>Register</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
