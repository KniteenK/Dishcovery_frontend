import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarContent, NavbarItem, User } from "@nextui-org/react";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function CustomerHeader() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = Cookies.get('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogout = () => {
    // Clear cookies and add logout logic here
    Cookies.remove('userData');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    navigate("/");
  };

  if (!userData) {
    return null; // or a loading spinner
  }

  const { avatar, username, fullName } = userData;


  return (
    <header className="shadow sticky top-0 z-50 bg-white">
      <Navbar className="h-16">
        <NavbarContent>
        <NavbarItem className="mr-4">
            <NavLink to="/customer/home" className={({ isActive }) =>
              `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 ${isActive ? "text-orange-700" : "text-gray-700"}`
            }>
              Home
            </NavLink>
          </NavbarItem>
          <NavbarItem className="mr-4">
            <NavLink to="/customer/SubstituingUnhealthy" className={({ isActive }) =>
              `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 ${isActive ? "text-orange-700" : "text-gray-700"}`
            }>
              Substituing unhealthy
            </NavLink>
          </NavbarItem>
          <NavbarItem className="mr-4">
            <NavLink to="/customer/RecommendingMeals" className={({ isActive }) =>
              `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 ${isActive ? "text-orange-700" : "text-gray-700"}`
            }>
              Recommending meals
            </NavLink>
          </NavbarItem>
          <NavbarItem className="mr-4">
            <NavLink to="/customer/CompatibilityTest" className={({ isActive }) =>
              `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 ${isActive ? "text-orange-700" : "text-gray-700"}`
            }>
              Compatibility Test
            </NavLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="ml-auto">
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: avatar,
                }}
                className="transition-transform"
                description={`@${username}`}
                name={fullName}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">@{username}</p>
              </DropdownItem>
              <DropdownItem key="settings" as={NavLink} to="/customer/profile-settings/profile">
                Profile
              </DropdownItem>
              {/* <DropdownItem key="analytics">
                Analytics
              </DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem> */}
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </header>
  );
}