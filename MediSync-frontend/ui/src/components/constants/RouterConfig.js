import Home from "../../Pages/Home/Home"
import Register from "../../Pages/Register/Register"
import NotFound from "../../Pages/Not Found/NotFound"
import Features from "../../Pages/Features/Features"
import LandingPage from "../../Pages/LandingPage/LandingPage"

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
      { path: "/features", element: <Features /> },
      { path: "/medical-solutions", element: <LandingPage /> },
    ],
}

export default routerConfig;
