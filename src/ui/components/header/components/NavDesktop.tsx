import { NavLink } from "react-router-dom";
import { PagesData } from "../../../../types/queryTypes";

interface Props {
  className: string;
  pages: PagesData["pages"];
}

const NavDesktop = ({ className, pages }: Props) => {
  return (
    <div
      className={`flex justify-around bg-eavid-600 border-black ${className}`}
    >
      {pages.nodes.map((node, idx) => (
        <NavLink
          key={idx}
          to={"/" + node.slug}
          className={({ isPending, isActive }) =>
            `block px-4 my-2 text-center rounded-full shadow-custom-sm hover:shadow-customHover-sm bg-white  border-black border-2 transition duration-200 ${
              isActive ? " underline" : isPending ? "bg-white text-black" : ""
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
