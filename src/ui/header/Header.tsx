import logo from "../../assets/Recurso 14@4x.png";
import { PagesData, PageNode } from "../../types/queryTypes";
import Spinner from "../Spinner";
import NavDesktop from "./components/NavDesktop";
import NavMobile from "./components/NavMobile";
import { useQuery, gql } from "@apollo/client";
const PAGES_SLUG = gql`
  query PagesSlug {
    pages {
      nodes {
        databaseId
        slug
        title
      }
    }
  }
`;

const Header = () => {
  const { loading, error, data } = useQuery<PagesData>(PAGES_SLUG, {
    fetchPolicy: "cache-and-network",
  });

  if (error) return <p>Error : {error.message}</p>;

  const handleSlugs = (slugsData: PagesData) => {
    const pages: { nodes: PageNode[] } =
      data != undefined
        ? {
            nodes: [
              { databaseId: 0, slug: "", title: "Inicio" },
              ...slugsData.pages.nodes,
            ],
          }
        : { nodes: [] };
    return pages;
  };

  return (
    <header className="border-b-4 border-black ">
      <div className="flex justify-between">
        <div className="flex justify-between items-stretch w-full h-20">
          <img src={logo} alt="logo EAVID" className="" />
          <h1 className="hidden md:block max-w-xl text-lg self-center font-semibold text-center px-8">
            Entrenamiento + acompañamiento, vida y deporte
          </h1>
        </div>
        {loading || data == undefined ? (
          <Spinner className="md:hidden" />
        ) : (
          <>
            <NavMobile className=" m-4 md:hidden" pages={handleSlugs(data)} />
          </>
        )}
      </div>
      {loading || data == undefined ? (
        <Spinner className="hidden md:block" />
      ) : (
        <>
          <NavDesktop className="hidden md:flex" pages={handleSlugs(data)} />
        </>
      )}
    </header>
  );
};

export default Header;
