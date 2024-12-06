import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CustomerHeader from './components/Customer/Header/CustomerHeader';
import ChatbotButton from './icons/chatbotbutton';
const CustomerLayout = () => {
  const location = useLocation();

  // Define routes where the header should be hidden
  const hideHeaderRoutes = ['/customer/profile-settings/profile'];

  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <div>
      {/* Conditionally render the header */}
      {!shouldHideHeader && (
        <CustomerHeader />
      )}
      <main>
        <Outlet />
      </main>
      <ChatbotButton/>

    </div>
  );
};
export default CustomerLayout;