import Home from "../../Pages/Home/Home"
import Register from "../../Pages/Register/Register"
import NotFound from "../../Pages/Not Found/NotFound"
import AboutUs from "../../Pages/AboutUs/AboutUs"
import DiseaseDetails from "../DiseaseDetails/DiseaseDetails"

const routerConfig = {
    common_routes: [
      {
        path: "/",
        // loader: tokenLoader,
        element: <Home />,
        children: [],
      },
    //   { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/*", element: <NotFound /> },
      { path: "/about-medisync", element: <AboutUs /> },
      { path: "/disease/:name", element: <DiseaseDetails /> }, 
    ],
}

export default routerConfig;
