import Main from "../layouts/Main";
import { useQuery } from "@apollo/client";
import Spinner from "../ui/Spinner";
import "../assets/landingPosts.css";
import LandingPost from "../components/LandingPost";
import {
  CategoryPostsQuery,
  CategoryPostsQueryVariables,
} from "./generated/graphql.ts";
import categoryPosts from "../graphql/categoryPosts.gql";

function Landing() {
  const categoryPostsQuery  = categoryPosts as CategoryPostsQuery
  const { loading, error, data } = useQuery(categoryPostsQuery, {
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
