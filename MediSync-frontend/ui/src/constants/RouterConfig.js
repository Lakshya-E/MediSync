import Home from "../Pages/Home/Home"
import Register from "../Pages/Register/Register"
import NotFound from "../Pages/Not Found/NotFound"
import AboutUs from "../Pages/AboutUs/AboutUs"
import DiseaseDetails from "../components/DiseaseDetails/DiseaseDetails"
import { routes } from "./routes"

const routerConfig = {
    common_routes: [
      {
        path: routes.ROOT,
        // loader: tokenLoader,
        element: <Home />,
      },
      // { path: "/login", element: <Login /> },
      { 
        path: routes.REGISTER, 
        element: <Register /> 
      },
      { 
        path: routes.NOTFOUND, 
        element: <NotFound /> 
      },
    ],
    landing_page_routes: [
      { 
        path: routes.ABOUTUS, 
        element: <AboutUs /> 
      },
      { 
        path: routes.DISEASE.DISEASEDETAILS, 
        element: <DiseaseDetails /> 
      }, 
    ]
}

export default routerConfig;
