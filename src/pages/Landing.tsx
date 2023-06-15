import Main from "../layouts/Main";
import { useQuery, gql } from "@apollo/client";
import Spinner from "../ui/Spinner";
import "../assets/landingPosts.css";

const CATEGORY_POSTS_QUERY = gql`
  query CategoryPosts($categoryName: String!) {
    posts(where: { categoryName: $categoryName }) {
      nodes {
        id
        title
        content
      }
    }
  }
`;

function Landing() {
  const { loading, error, data } = useQuery(CATEGORY_POSTS_QUERY, {
    variables: { categoryName: "landing" },
  });
  if (error) {
    console.log(error);
  }

  return (
    <Main>
      {loading ? (
        <Spinner className="w-full" />
      ) : (
        data.posts.nodes.map((node: { content: string }) => (
          <article
            className="wp-post"
            dangerouslySetInnerHTML={{ __html: node.content }}
          />
        ))
      )}
    </Main>
  );
}

export default Landing;
