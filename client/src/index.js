import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import NewHouseFormPage from './NewHouseFormPage/NewHouseFormPage';
import HouseDetailsPage, { loader as HouseDetailsPageLoader } from './HouseDetailsPage/HouseDetailsPage';
import ErrorPage from './ErrorPage';

import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/new-house",
    element: <NewHouseFormPage />,
  },
  {
    path: "/house-details/:houseId",
    element: <HouseDetailsPage />,
    loader: HouseDetailsPageLoader,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
