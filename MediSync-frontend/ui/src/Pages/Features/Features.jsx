import React from "react";
import { useNavigate } from "react-router-dom";
import { navigateToHome } from "../../store/actions/navigateAction";

const Features = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigateToHome(navigate)
    };

    return (
        <>
        <h2>This is Zylo Features Page</h2>
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

        <button onClick={handleHomeClick}>Home</button>
        </>
    )
};

export default Features
