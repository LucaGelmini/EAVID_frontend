import Main from "../layouts/Main";
import { useQuery, gql } from "@apollo/client";
import Spinner from "../ui/Spinner";
import "../assets/landingPosts.css";
import LandingPost from "../components/LandingPost";
import type { UseQueryResult, PostsData } from "../types/queryTypes";

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
              textColor
              level
            }
          }
          ... on CoreCover {
            attributes {
              url
              backgroundType
              align
              focalPoint
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
  const { loading, error, data }: UseQueryResult<PostsData> = useQuery(
    CATEGORY_POSTS_QUERY,
    {
      variables: { categoryName: "landing" },
    }
  );
  if (error) {
    console.log(error);
  }
  return (
    <Main>
      {data === undefined || loading ? (
        <Spinner className="w-full" />
      ) : (
        <>
          {data.posts.nodes.map((node) => (
            <LandingPost node={node} key={node.id} />
          ))}
        </>
      )}
    </Main>
  );
}

export default Landing;
