import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarContent, NavbarItem, User } from "@nextui-org/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function CustomerHeader() {
  const navigate = useNavigate();
  const avatar = "path/to/avatar.jpg"; // Replace with actual avatar path
  const username = "username"; // Replace with actual username
  const fullName = "Full Name"; // Replace with actual full name

  const handleLogout = () => {
    // Add logout logic here
    navigate("/");
  };

  return (
    <header className="shadow sticky top-0 z-50 bg-primary
    ">
    <Navbar className="h-16 flex justify-between items-center px-4">
      <NavbarContent className="flex items-center">
        <a className="flex justify-around items-center" href="/">
          <img src="/logo.png" alt="logo" width="70" height="40"/>
          <h1 className="font-bold text-4xl">Dishcovery</h1>
        </a>
      </NavbarContent>
  
      {/* Centered navbar items */}
      <NavbarContent className="flex flex-1 justify-center space-x-4">
        <NavbarItem className="mr-4">
          <NavLink
            to="/customer/home"
            className={({ isActive }) =>
              `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-white
               lg:p-0 ${isActive ? " text-white border-b-[100px] border-white" : "text-black"}`
            }
          >
            Home
          </NavLink>
        </NavbarItem>
        <NavbarItem className="mr-4">
          <NavLink
            to="/customer/SubstituingUnhealthy"
            className={({ isActive }) =>
              `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-white
               lg:p-0 ${isActive ? " text-white border-b-[100px] border-white" : "text-black"}`
            }
          >
            Substituing unhealthy
          </NavLink>
        </NavbarItem>
        <NavbarItem className="mr-4">
          <NavLink
            to="/customer/RecommendingMeals"
            className={({ isActive }) =>
              `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-white
               lg:p-0 ${isActive ? " text-white border-b-[100px] border-white" : "text-black"}`
            }
          >
            Recommending meals
          </NavLink>
        </NavbarItem>
        <NavbarItem className="mr-4">
          <NavLink
            to="/customer/CompatibilityTest"
            className={({ isActive }) =>
              `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-white
               lg:p-0 ${isActive ? " text-white border-b-[100px] border-white" : "text-black"}`
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