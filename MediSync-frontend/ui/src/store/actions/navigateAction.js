import { routes } from "../../components/constants/routes";

export const navigateToHome = (navigate) => {
    navigate(routes.ROOT);
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
