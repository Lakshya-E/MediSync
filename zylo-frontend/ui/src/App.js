import React from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import './App.css';
import routerConfig from './components/constants/RouterConfig';

function App() {
  let route = [];
  let common_routes = routerConfig?.common_routes;
  console.log(common_routes)

  route = route.concat(common_routes);
  const hashRouter = createHashRouter(route);

  return (
    <>
      <RouterProvider router={hashRouter} />
    </>
  );
}

export default App;
