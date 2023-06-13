import logo from "../../assets/Recurso 14@4x.png";
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
  const { loading, error, data } = useQuery(PAGES_SLUG);

  if (error) return <p>Error : {error.message}</p>;
  return (
    <header className="border-b-4 border-black flex justify-between">
      <div className="flex justify-around h-20">
        <img src={logo} alt="logo EAVID" className="" />
        <h1 className="hidden md:block max-w-xl text-lg font-semibold text-center">
          Entrenamiento + acompañamiento, vida y deporte
        </h1>
      </div>
      {loading ? (
        <Spinner className="" />
      ) : (
        <>
          <NavDesktop className="hidden md:block" />
          <NavMobile className=" m-4 md:hidden" pages={data.pages} />
        </>
      )}
    </header>
  );
};

export default Header;
