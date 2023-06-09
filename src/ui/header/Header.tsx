import logo from "../../assets/Recurso 14@4x.png";
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
    <header className=" bg-gray-300">
      <div className="flex justify-around h-16">
        <img src={logo} alt="logo EAVID" />
        <h1 className="max-w-xl text-lg font-semibold text-center">
          Entrenamiento + acompañamiento, vida y deporte
        </h1>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <NavDesktop className="hidden md:block" />
          <NavMobile className="block md:hide" pages={data.pages} />
        </>
      )}
    </header>
  );
};

export default Header;
