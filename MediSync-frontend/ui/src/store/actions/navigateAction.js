import { routes } from "../../components/constants/routes";

export const navigateToHome = (navigate) => {
    navigate(routes.ROOT)
};

export const navigateToSignUp = (navigate) => {
    navigate(routes.REGISTER)
};

export const navigateToAboutUs = (navigate) => {
    navigate(routes.ABOUTUS)
};

export const navigateToLanding = (navigate) => {
    navigate(routes.LANDING)
};

export const navigateToWellnessGuide = (navigate, name) => {
    console.log(`${routes.DISEASE.DISEASE}${name}`)
    navigate(`${routes.DISEASE.DISEASE}${name}`)
};
