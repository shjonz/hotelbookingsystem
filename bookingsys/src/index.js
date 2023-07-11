import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
 
import {
 createBrowserRouter,
 RouterProvider,
} from "react-router-dom";

import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Profile from './views/Profile';

const router = createBrowserRouter([
 {
  path: "/",
  element: <Home />
 },

 {
  path: "/login",
  element: <Login />
 },

 {
  path: "/register",
  element: <Register />
 },

 {
  path: "/profile",
  element: <Profile />,
 }

//  {
//   path: "/empty",
//   element: <EmptyPage />,
//  },

//  {
//   path: "/author",
//   element: <AuthorPage />,
//  }
  
]);
 
ReactDOM.createRoot(document.getElementById("root")).render(
   <RouterProvider router={router} />
);