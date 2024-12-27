import { routes } from "../../components/constants/routes";

export const navigateToHome = (navigate) => {
    navigate(routes.ROOT);
};

export const navigateToSignUp = (navigate) => {
    navigate(routes.REGISTER)
};

export const navigateToFeatures = (navigate) => {
    navigate(routes.FEATURES)
};