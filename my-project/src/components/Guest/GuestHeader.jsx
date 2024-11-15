
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { Menu, X } from "lucide-react";

export const GuestHeader = () => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor("var(--primary-color)"); 
        setTextColor("#ffffff"); 
      } else {
        setColor("#ffffff");
        setTextColor("#000000"); 
      }
    };
    window.addEventListener("scroll", changeColor);
  }, []);

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="fixed left-0 top-0 w-full z-10 ease-in duration-300 bg-white"
    >
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-4 text-white">
      <Link className=" flex justify-around items-center"href="/">
          <img src="/logo.png" alt="logo" width="70" height="40"/>
          <h1 style={{ color: `${textColor}` }} className="font-bold text-4xl">
            Dishcovery
          </h1>
        </Link>

        <ul style={{ color: `${textColor}` }} className="hidden sm:flex">
          <li className="p-4">
            <Link href="/">Home</Link>
          </li>
          <li className="p-4">
            <Link href="#features">About </Link>
          </li>
          <li className="p-4">
            <Link href="#testimonials">Contact Us</Link>
          </li>
        </ul>

        {/*Mobile menu button  */}
        <div onClick={handleNav} className="block sm:hidden z-10">
          {nav ? (
            <X size={20} style={{ color: `${textColor}` }} />
          ) : (
            <Menu size={20} style={{ color: `${textColor}` }} />
          )}
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={
          nav
            ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
            : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
        }
      >
        <ul className="hidden sm:flex">
          <li onClick={handleNav} className="p-4 text-4xl hover:text-gray-500">
            <Link href="/">Home</Link>
          </li>
          <li onClick={handleNav} className="p-4 text-4xl hover:text-gray-500">
            <Link href="/#Testimonials">Testimonials</Link>
          </li>
          <li onClick={handleNav} className="p-4 text-4xl hover:text-gray-500">
            <Link href="#features">About Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};



// import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";

// function GuestHeader() {
//   const navigate = useNavigate();
//   const handleLoginClick = () => {
//     navigate("/login");
//   };

//   const handleSignupClick = () => {
//     navigate("/signup");
//   };

//   return (
//     <header className="shadow sticky z-50 top-0">
//       <Navbar className="h-16"> {/* Increase the height here */}
//         <NavbarContent>
//           <NavbarItem>
//             <NavLink to="/about" className={({ isActive }) =>
//               `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 ${isActive ? "text-orange-700" : "text-gray-700"}`
//             }>
//               About us
//             </NavLink>
//           </NavbarItem>
//         </NavbarContent>
//         <NavbarContent className="ml-auto mr-[10%]">
//           <NavbarItem className="mr-[5%]">
//             <Button onClick={handleLoginClick}>
//               Login
//             </Button>
//           </NavbarItem>
//           <NavbarItem>
//             <Button onClick={handleSignupClick}>
//               SignUp
//             </Button>
//           </NavbarItem>
//         </NavbarContent>
//       </Navbar>
//     </header>
//   );
// }

// export default GuestHeader;