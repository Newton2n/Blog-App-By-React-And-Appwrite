import React, { use } from "react";
import { Link, NavLink } from "react-router-dom";
import Add from "../../icons/Add.png";
import Home from "../../icons/Home.png";
import Profile from "../../icons/Profile.png";

import { useSelector } from "react-redux";
import { Container } from "../index";
function BottomNav() {
  const userData = useSelector((data) => data.auth.userData);

  const navItems = [
    {
      name: "Home",
      icon: Home,
      slug: "/",
    },

    {
      name: "Add",
      icon: Add,
      slug: "/add-post",
    },
    {
      name: "Profile",
      icon: Profile,
      slug: `/profile/${userData?.$id}`,
    },
  ];
  return (
    <Container>
      <nav className="w-full  bg-white fixed bottom-0 z-20 sm:hidden">
        <ul className="w-full flex justify-around items-center">
          {navItems.map((item) => (
            <li
              className=" flex justify-center items-center hover:bg-gray-50 rounded"
              key={item.name}
            >
              <NavLink to={item.slug}>
                <img className="h-8 w-8 m-2" src={item.icon} alt="Home" />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}

export default BottomNav;
