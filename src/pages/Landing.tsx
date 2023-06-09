import { useQuery, gql } from "@apollo/client";
import Main from "../layouts/Main";

function App() {
  const { loading, error, data } = useQuery(PAGES_SLUG);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(">>>>>>>>>>>>>>>>", data);

  return (
    <Main>
      <>
        <h2 className=" font-bold">Página en construcción</h2>
        <p>¡Sea paciente!</p>
      </>
    </Main>
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
        link
      }
    }
  }
`;
