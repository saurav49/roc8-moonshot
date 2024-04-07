import React from "react";
import { type NavLinksType } from "./Navbar";

const navLinks: NavLinksType = {
  links: [
    {
      name: "Help",
      link: "help",
    },
    {
      name: "Orders & Returns",
      link: "orders-returns",
    },
    {
      name: "Login",
      link: "login",
    },
  ],
};

function NavInfo() {
  return (
    <nav className="flex items-center justify-end px-8 py-3">
      <ul className="flex items-center">
        {navLinks.links.map((navInfo) => {
          return (
            <li
              className=" mx-5 text-xs font-normal text-black"
              key={`${navInfo.name}-${navInfo.link}`}
            >
              {navInfo.name}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { NavInfo };
