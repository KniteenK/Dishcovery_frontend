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
    <header className="shadow sticky top-0 z-45 bg-tertiary
    ">
    <Navbar className="h-16 flex justify-between items-center px-4">
      <NavbarContent className="flex items-center">
        <a className="flex justify-around items-center" href="/">
          <img className="hidden sm:block"src="/logo.png" alt="logo" width="70" height="40"/>
          <h1 className=" hidden lg:block font-bold text-4xl">Dishcovery</h1>
        </a>
      </NavbarContent>
  
      {/* Centered navbar items */}
      <NavbarContent className="flex flex-1 justify-center space-x-4">
        <NavbarItem className="mr-4">

          <NavLink
            to="/customer/home"
            className={({ isActive }) =>
              `hover:text-white
                ${isActive ? "text-white" : "text-black"}`
            }
          >
            Home
          </NavLink>
        </NavbarItem>
        <NavbarItem className="mr-4">
          <NavLink
            to="/customer/SubstituingUnhealthy"
            className={({ isActive }) =>
              `hover:text-white
                ${isActive ? "text-white" : "text-black"}`
            }
          >
            Substituing unhealthy
          </NavLink>
        </NavbarItem>
        <NavbarItem className="mr-4">
          <NavLink
            to="/customer/RecommendingMeals"
            className={({ isActive }) =>
              `hover:text-white
                ${isActive ? "text-white" : "text-black"}`
            }
          >
            Recommending meals
          </NavLink>
        </NavbarItem>
        <NavbarItem className="mr-4">
          <NavLink
            to="/customer/CompatibilityTest"
            className={({ isActive }) =>
              `hover:text-white
                ${isActive ? "text-white" : "text-black"}`
            }
          >
            Compatibility Test
          </NavLink>
        </NavbarItem>
      </NavbarContent>
  
      {/* Right-side dropdown */}
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
              // description={`@${username}`}
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