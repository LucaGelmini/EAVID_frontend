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

const NavDesktop = ({ className, pages }: Props) => {
  return (
    <div
      className={`flex justify-between border-t-2 border-black ${className}`}
    >
      {pages.nodes.map((node, idx) => (
        <a
          key={idx}
          href={"/" + node.slug}
          className=" px-4 m-2 w-full text-center border-black border-2 hover:bg-black hover:text-white transition duration-200"
        >
          {node.title}
        </a>
      ))}
    </div>
  );
};

export default NavDesktop;
