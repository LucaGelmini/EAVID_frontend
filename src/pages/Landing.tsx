import Main from "../layouts/Main";
import { useQuery } from "@apollo/client";
import "../assets/landingPosts.css";
import LandingPost from "../components/LandingPost";
import type { UseQueryResult, PostsData } from "../types/queryTypes";
import landingPostsQuery from "../graphql/landingPostsQuery.graphql";
import { Box, Skeleton, Stack, Text } from "@chakra-ui/react";

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
        <Stack height="full" mt="20">
          <Skeleton height="30px" width={40} />
          <Skeleton height={40} />
          <Skeleton height="80px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : data.posts.nodes.length !== 0 ? (
        <>
          {data.posts.nodes.map((node) => (
            <LandingPost node={node} key={node.id} />
          ))}
        </>
      ) : (
        <Box className="shadow-custom-md" width="full" height="full">
          <Text>Por aquí no hay nada todavía</Text>
        </Box>
      )}
    </Main>
  );
}

export default Landing;
