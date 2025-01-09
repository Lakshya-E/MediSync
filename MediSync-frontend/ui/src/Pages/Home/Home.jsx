import React from "react";
import { useNavigate } from "react-router-dom";
import { 
    navigateToSignUp,
    navigateToFeatures
} from "../../store/actions/navigateAction";

const Home = () => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigateToSignUp(navigate);
    };

    const handleFeatureClick = () => {
        navigateToFeatures(navigate);
    };

    return (
        <>
        <button onClick={handleSignUpClick}>Sign Up</button>
        <button onClick={handleFeatureClick}>Features Page</button>
        </>
    )
};

export default Home
