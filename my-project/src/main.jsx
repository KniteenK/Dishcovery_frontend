import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login.jsx'
import Register from './components/auth/Register.jsx'
import GuestLayout from './GuestLayout.jsx'
import './index.css'
const router = createBrowserRouter([
  {
    path: '/',
    element:<GuestLayout />,
    children: [

    ]

  },
  {
    path: '/login', 
    element: <Login /> 
  },
  {
    path: '/signup', 
    element: <Register />
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />

  </React.StrictMode>,
)
