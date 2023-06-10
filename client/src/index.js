import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './HomePage';
import NewHousePage from './Pages/NewHousePage';
import HouseDetailsPage, { loader as HouseDetailsPageLoader } from './Pages/HouseDetailsPage';
import EditHousePage, { loader as EditHousePageLoader } from './Pages/EditHousePage';
import ErrorPage from './ErrorPage';

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
  },
  {
    path: "/house-details/:houseId",
    element: <HouseDetailsPage />,
    loader: HouseDetailsPageLoader,
  },
  {
    path: "/edit-house/:houseId",
    element: <EditHousePage />,
    loader: EditHousePageLoader,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
