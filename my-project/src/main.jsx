import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import Home from './components/Customer/Header/Home/Home.jsx';
import NewRecipe from './components/Customer/Header/New Recipe/New Recipe .jsx';
import RecommendingMeals from './components/Customer/Header/Recommending meals/RecommendingMeals.jsx';
import SubstituingUnhealthy from './components/Customer/Header/Substituing unhealthy/Substituing unhealthy.jsx';
import Profile from './components/Customer/Profile/Profile.jsx';
import CustomerLayout from './CustomerLayout.jsx';
import GuestLayout from './GuestLayout.jsx';
import './index.css';
import ProfileSettingsLayout from './ProfileSettingLayout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: []
  },
  {
    path: '/customer',
    element: <CustomerLayout />,
    children: [
      {
        path: 'profile-settings',
        element: <ProfileSettingsLayout />,
        children: [
          {
            path: 'profile',
            element: <Profile />
          }
        ]
      },
      {
        path: 'home',
        index: true,
        element: <Home />
      },
      {
        path: 'SubstituingUnhealthy',
        element: <SubstituingUnhealthy />
      },
      {
        path: 'RecommendingMeals',
        element: <RecommendingMeals />
      },
      {
        path: 'NewRecipe',
        element: <NewRecipe />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);