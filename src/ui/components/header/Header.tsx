import { Link } from "react-router-dom";
import logo from "../../assets/Recurso 14@4x.png";
import {
  PagesDTO,
  PageNodeDTO,
} from "../../../infrastructure/dataTransferObjects/PagesDTO";
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
  const { loading, error, data } = useQuery<PagesDTO>(PAGES_SLUG, {
    fetchPolicy: "cache-and-network",
  });

  if (error) return <p>Error : {error.message}</p>;

  const handleSlugs = (slugsData: PagesDTO) => {
    const pages: { nodes: PageNodeDTO[] } =
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
      <div className="flex justify-between bg-eavid-600">
        <div className="flex justify-between items-stretch w-full h-24">
          <Link to="/" className="w-60">
            <img src={logo} alt="logo EAVID" className="h-full m-auto" />
          </Link>

          <h1 className="hidden md:block text-white text-lg font-light italic md:text-4xl md:w-full self-center text-center px-8">
            Entrenamiento + Acompañamiento, Vida y Deporte
          </h1>
        </div>
        {loading || data == undefined ? (
          <Spinner className="md:hidden" />
        ) : (
          <NavMobile className=" m-4 md:hidden" pages={handleSlugs(data)} />
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
