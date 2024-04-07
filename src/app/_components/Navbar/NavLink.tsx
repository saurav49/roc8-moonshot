import { type NavLinksType } from "./Navbar";

function NavLink({ navLinks }: { navLinks: NavLinksType }) {
  return (
    <ul className="flex items-center">
      {navLinks.links.map((navInfo) => {
        return (
          <li
            className="font-inter mx-8 text-base font-semibold text-black"
            key={`${navInfo.name}-${navInfo.link}`}
          >
            {navInfo.name}
          </li>
        );
      })}
    </ul>
  );
}

export { NavLink };
