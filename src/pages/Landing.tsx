import Main from "../layouts/Main";
import { useQuery } from "@apollo/client";
import Spinner from "../ui/Spinner";
import "../assets/landingPosts.css";
import LandingPost from "../components/LandingPost";
import type { UseQueryResult, PostsData } from "../types/queryTypes";
import landingPostsQuery from "../graphql/landingPostsQuery.graphql";

function Landing() {
  const { loading, error, data }: UseQueryResult<PostsData> = useQuery(
    landingPostsQuery,
    {
      variables: { categoryName: "landing" },
    }
  );
  if (error) {
    console.error(error);
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
