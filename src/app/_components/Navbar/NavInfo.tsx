import React from "react";
import { type NavLinksType } from "./Navbar";
import { LogButton } from "./LogButton";

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

export const LOGIN = "Login";

function NavInfo() {
  return (
    <nav className="flex items-center justify-end px-8 py-3">
      <ul className="flex items-center">
        {navLinks.links.map((navInfo) => {
          return (
            <div key={`${navInfo.name}-${navInfo.link}`}>
              {navInfo.name === LOGIN ? (
                <LogButton btnText={navInfo.name} />
              ) : (
                <li className="mx-4 text-xs font-normal text-black">
                  {navInfo.name}
                </li>
              )}
            </div>
          );
        })}
      </ul>
    </nav>
  );
}

export { NavInfo };
