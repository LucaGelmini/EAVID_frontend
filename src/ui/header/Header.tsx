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

const contenido = {
  a: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
     Eius, minima. Porro quasi eum fugiat incidunt! Quis possimus,
      consectetur aspernatur eligendi pariatur totam iure nemo recusandae
       ipsum quisquam. Nemo, facere architecto.`,
  b: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Eius, minima. Porro quasi eum fugiat incidunt! Quis possimus,
     consectetur aspernatur eligendi pariatur totam iure nemo recusandae
      ipsum quisquam. Nemo, facere architecto.`,
};

const Header = () => {
  const {
    loading,
    error,
    data: { pages },
  } = useQuery(PAGES_SLUG);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <header className=" bg-gray-300">
      <div className="flex justify-around h-16">
        <img src={logo} alt="logo EAVID" />
        <h1 className="max-w-xl text-lg font-semibold text-center">
          Entrenamiento + acompañamiento, vida y deporte
        </h1>
      </div>
      <NavMobile className="block md:hide" pages={pages} />
      <NavDesktop className="hidden md:block" />
    </header>
  );
};

export default Header;
