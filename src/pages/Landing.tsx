import Main from "../layouts/Main";
import { useQuery, gql } from "@apollo/client";
import Spinner from "../ui/Spinner";
import "../assets/landingPosts.css";
import LandingPost from "../components/LandingPost";

const CATEGORY_POSTS_QUERY = gql`
  query CategoryPosts($categoryName: String!) {
    posts(where: { categoryName: $categoryName }) {
      nodes {
        id
        title
        editorBlocks(flat: true) {
          __typename
          clientId
          parentClientId
          ... on CoreHeading {
            attributes {
              content
            }
          }
          ... on CoreCover {
            attributes {
              url
              backgroundType
              align
            }
          }
          ... on CoreParagraph {
            attributes {
              content
              align
            }
          }
        }
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
        data.posts.nodes.map((node) => <LandingPost node={node} />)
      )}
    </Main>
  );
}

export default Landing;
