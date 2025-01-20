import React from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import './App.css';
import routerConfig from './components/constants/RouterConfig';

function App() {
  const { common_routes, landing_page_routes } = routerConfig;

  const routes = [
    ...common_routes,
    ...landing_page_routes,
  ];

  const hashRouter = createHashRouter(routes);

  return (
    <>
      <RouterProvider router={hashRouter} />
    </>
  );
}

export default App;
