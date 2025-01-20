import React from "react";
import './Home.scss'
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar/Navbar";
import LandingPage from "../LandingPage/LandingPage";
import Footer from "../../components/common/Footer/Footer";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="page-container">
            <Navbar />
            <LandingPage />
            <Footer />
        </div>
    )
};

export default Home
