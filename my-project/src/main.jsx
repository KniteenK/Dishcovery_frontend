import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import CompatibilityTest from './components/Customer/Header/Compatibility Test/CompatibilityTest.jsx';
import Home from './components/Customer/Header/Home/Home.jsx';
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
        index: true,
        path: 'home',
       
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
        path: 'CompatibilityTest',
        element: <CompatibilityTest />
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