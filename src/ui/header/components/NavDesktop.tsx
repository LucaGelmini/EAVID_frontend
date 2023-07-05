import { NavLink } from "react-router-dom";
import { PagesData } from "../../../types/queryTypes";

interface Props {
  className: string;
  pages: PagesData["pages"];
}

const NavDesktop = ({ className, pages }: Props) => {
  return (
    <div
      className={`flex justify-between border-t-2 border-black ${className}`}
    >
      {pages.nodes.map((node, idx) => (
        <NavLink
          key={idx}
          to={"/" + node.slug}
          className={({ isPending, isActive }) =>
            `block px-4 my-2 w-full text-center border-black border-2 hover:bg-black hover:text-white transition duration-200 ${
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
  );
};

export default NavDesktop;
