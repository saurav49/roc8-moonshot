import React from "react";
import { NavLink } from "./NavLink";
import { CartIcon, SearchIcon } from "../Icons/Icons";

export type NavLinksType = {
  links: Array<{
    name: string;
    link: string;
  }>;
};

const navLinks: NavLinksType = {
  links: [
    {
      name: "Categories",
      link: "categories",
    },
    {
      name: "Sale",
      link: "sale",
    },
    {
      name: "Clearance",
      link: "clearance",
    },
    {
      name: "New stock",
      link: "new-stock",
    },
    {
      name: "Trending",
      link: "trending",
    },
  ],
};

function Navbar() {
  return (
    <nav className="flex w-screen items-center justify-between px-10 py-4">
      <h1 className=" text-4xl font-bold">ECOMMERCE</h1>
      <NavLink navLinks={navLinks} />
      <div className="flex items-center">
        <button className="cursor-pointer">
          <SearchIcon />
        </button>
        <button className="ml-8 cursor-pointer">
          <CartIcon />
        </button>
      </div>
    </nav>
  );
}

export { Navbar };
