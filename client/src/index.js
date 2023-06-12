import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import { HouseDetailsLoader } from "./RoutesLoaders";
import HomePage from './Pages/HomePage';
import NewHousePage from './Pages/NewHousePage';
import HouseDetailsPage from './Pages/HouseDetailsPage';
import EditHousePage from './Pages/EditHousePage';
import HouseNotFoundPage from './Pages/ErrorPages/HouseNotFoundErrorPage';
import ErrorPage from './Pages/ErrorPages/GenericErrorPage';

import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/new-house",
    element: <NewHousePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/house-details/:houseId",
    element: <HouseDetailsPage />,
    loader: HouseDetailsLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/edit-house/:houseId",
    element: <EditHousePage />,
    loader: HouseDetailsLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/house-not-found",
    element: <HouseNotFoundPage />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
