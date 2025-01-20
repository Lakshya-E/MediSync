import React from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import Footer from "../../components/common/Footer/Footer";

const AboutUs = () => {
    return (
        <>
        <Navbar />
        <h2>This is Medisync About Us Page</h2>
        <p>List of all the features</p>

        <h4>User Management: (Features given to users)</h4>
        <ul>
            <ol>User Dashboard</ol>
            <ol>Home</ol>
        </ul>

        <h4>Hospital Management: (Features given to hospital staff)</h4>
        <ul>
            <ol>Hospital Profile</ol>
            <ol>Doctors Profile</ol>
            <ol>Patients Profile</ol>
        </ul>

        <h4>Our Facilities to User and Hospitals</h4>
        <ul>
            <ol>Report Analysis</ol>
            <ol>Medicinal Information</ol>
            <ol>Personal Well Being</ol>
        </ul>
        <Footer />
        </>
    )
};

export default AboutUs
