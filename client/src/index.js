import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Navbar from './fragments/Navbar';
import Auth from './fragments/Auth';
import CreateRecipie from './fragments/CreateRecipie';
import SavedRecipie from './fragments/SavedRecipie';
import RecipieDetails from './fragments/RecipieDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Navbar/>,
    children:[
      {
        index: true,
        element:<App/>
      },
      {
        path: "/auth",
        element: <Auth/>
      },
      {
        path: "/create-recipie",
        element:<CreateRecipie/>
      },
      {
        path: "/saved-recipie",
        element:<SavedRecipie/>
      },
      {
        path: "/recipie-details/:recipieID",
        element:<RecipieDetails/>
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);


