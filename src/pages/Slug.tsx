import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import type { UseQueryResult, PageNode, PostsData } from "../types/queryTypes";
import pageQuery from "../graphql/pageQuery.graphql";
import Main from "../layouts/Main";
import Spinner from "../ui/Spinner";
import landingPostsQuery from "../graphql/landingPostsQuery.graphql";
import LandingPost from "../components/LandingPost";
import ContactForm from "../components/ContactForm";
import client from "../graphql/apolloClient.ts";
import { Skeleton, Stack } from "@chakra-ui/react";

type Props = {
  databaseId: number;
  hasContactForm?: boolean | null;
  contactMail: string | null;
};

const Slug = ({ databaseId, hasContactForm, contactMail }: Props) => {
  const { loading, error, data }: UseQueryResult<{ page: PageNode }> = useQuery(
    pageQuery,
    {
      variables: {
        databaseId: databaseId,
      },
    }
  );
  if (error) {
    console.error(error);
  }

  const [postsData, setPostData] = useState<PostsData | undefined>(undefined);
  useEffect(() => {
    if (!loading && data !== undefined) {
      client
        .query({
          query: landingPostsQuery,
          variables: {
            categoryName: data?.page.slug,
          },
        })
        .then((res) => setPostData(res.data))
        .catch(console.error);
    }
  }, [loading, data]);

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
      ) : (
        <>
          {hasContactForm && (
            <div className="w-3/4 mx-auto p-4">
              <h1 className="text-3xl font-semibold">{data.page.title}</h1>
              {data.page.editorBlocks?.map((block) => block.attributes.content)}
              {contactMail && <ContactForm contactMail={contactMail} />}
            </div>
          )}
          <div>
            {postsData === undefined ? (
              <Spinner className="w-full" />
            ) : (
              <>
                {postsData.posts.nodes.map((node) => (
                  <LandingPost node={node} key={node.id} />
                ))}
              </>
            )}
          </div>
        </>
      )}
    </Main>
  );
};

export default Slug;
