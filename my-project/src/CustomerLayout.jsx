import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerHeader from './components/Customer/Header/CustomerHeader';
function GuestLayout() {
  return (
    <>
    <CustomerHeader />
    <Outlet />
    </>
  )
}

export default GuestLayout;