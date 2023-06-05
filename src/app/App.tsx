import logo from "../assets/Recurso 14@4x.png";
import { useQuery, gql } from "@apollo/client";

function App() {
  const { loading, error, data } = useQuery(PAGES_SLUG);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(">>>>>>>>>>>>>>>>", data);

  return (
    <div className="bg-eavid-100 w-full min-h-screen">
      <header className="flex justify-around h-16 bg-gray-300">
        <img src={logo} alt="logo EAVID" />
        <h1 className="max-w-xl text-2xl font-bold">
          EAVID Entrenamiento + acompañamiento, vida y deporte
        </h1>
      </header>
      <main className="m-auto w-4/5">
        <h2 className=" font-bold">Página en construcción</h2>
        <p>¡Sea paciente!</p>
      </main>
    </div>
  );
}

export default App;

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
