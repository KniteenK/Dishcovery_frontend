import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function GuestHeader() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <Navbar className="h-16"> {/* Increase the height here */}
        <NavbarContent>
          <NavbarItem>
            <NavLink to="/about" className={({ isActive }) =>
              `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 ${isActive ? "text-orange-700" : "text-gray-700"}`
            }>
              About us
            </NavLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="ml-auto mr-[10%]">
          <NavbarItem className="mr-[5%]">
            <Button onClick={handleLoginClick}>
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button onClick={handleSignupClick}>
              SignUp
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </header>
  );
}

export default GuestHeader;