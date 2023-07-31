import { useState } from "react";
import { PagesData } from "../../../../types/queryTypes";
import { NavLink } from "react-router-dom";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

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
          {isOpen ? (
            <CloseIcon width="6" height="6" />
          ) : (
            <HamburgerIcon width="6" height="6" />
          )}
        </button>
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className={`absolute top-0 left-0 h-screen w-screen z-10`}
          />
        )}

        {isOpen && (
          <div
            className={`${
              isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
            } absolute z-20 top-20 left-0 flex flex-col items-center w-full bg-neutral-100 rounded shadow-lg transition-all duration-300 transform ease-in-out`}
          >
            <div className="flex flex-col items-center mt-2 w-48  rounded shadow-lg">
              {pages.nodes.map((node, idx) => (
                <NavLink
                  key={idx}
                  onClick={() => setIsOpen(false)}
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavMobile;
