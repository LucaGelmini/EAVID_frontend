import { useState } from "react";
import { PagesData } from "../../../types/queryTypes";
import { NavLink } from "react-router-dom";

interface Props {
  className: string;
  pages: PagesData["pages"];
}

const NavMobile = ({ className, pages }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={className}>
      <div className="flex flex-col justify-center items-center">
        {/* <div className="text-2xl font-bold">Logo</div> */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded border-black border-2"
          type="button"
        >
          {/* Hamburger menu icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 5a1 1 0 100 2h12a1 1 0 100-2H4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className={`${
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } absolute z-10 top-20 left-0 flex flex-col items-center w-full bg-neutral-100 rounded shadow-lg transition-all duration-300 transform ease-in-out`}
        >
          {isOpen && (
            <div className="flex flex-col items-center mt-2 w-48  rounded shadow-lg">
              {pages.nodes.map((node, idx) => (
                <NavLink
                  key={idx}
                  to={"/" + node.slug}
                  className={({ isPending, isActive }) =>
                    `block px-4 my-2 w-full text-center border-black border-2 ${
                      isActive
                        ? "bg-black text-white"
                        : isPending
                        ? "bg-white text-black"
                        : ""
                    }`
                  }
                >
                  {node.title}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavMobile;
