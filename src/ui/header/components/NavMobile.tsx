import { useState } from "react";
const paginas = [
  { name: "pag 1", url: "#" },
  { name: "pag 2", url: "#" },
  { name: "pag 3", url: "#" },
];

interface Props {
  className: string;
  pages: {
    nodes: Array<{
      databaseId: number;
      slug: string;
      title: string;
      link: string;
    }>;
  };
}

const NavMobile = ({ className, pages }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={"bg-gray-800 text-white" + className}>
      <nav className="container mx-auto px-4 py-2">
        <div className="flex flex-col justify-center items-center">
          {/* <div className="text-2xl font-bold">Logo</div> */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded bg-gray-700"
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
            } flex flex-col items-center mt-2 w-48 bg-gray-800 rounded shadow-lg transition-all duration-300 transform ease-in-out`}
          >
            {isOpen && (
              <div className="flex flex-col items-center mt-2 w-48 bg-gray-800 rounded shadow-lg">
                {pages.nodes.map((node, idx) => (
                  <a
                    key={idx}
                    href={"/" + node.slug}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    {node.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavMobile;