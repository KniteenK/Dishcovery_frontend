import React from 'react';
import { Outlet } from 'react-router-dom';
import GuestHeader from './components/Guest/Header/GuestHeader';
function GuestLayout() {
  return (
    <>
    <GuestHeader />
    <Outlet />
    </>
  )
}

export default GuestLayout;