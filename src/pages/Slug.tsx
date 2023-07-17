import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import type { UseQueryResult, PageNode, PostsData } from "../types/queryTypes";
import pageQuery from "../graphql/pageQuery.graphql";
import mailMutation from "../graphql/mailMutation.graphql";
import Main from "../layouts/Main";
import Spinner from "../ui/Spinner";
import landingPostsQuery from "../graphql/landingPostsQuery.graphql";
import LandingPost from "../components/LandingPost";
import ContactForm from "../components/ContactForm";
import client from "../graphql/apolloClient.ts";

type Props = {
  databaseId: number;
  hasContactForm?: boolean | null;
  contactMail?: string | null;
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

  client
    .mutate({
      mutation: mailMutation,
    })
    .then(console.log)
    .catch(console.error);

  return (
    <Main>
      {data === undefined || loading ? (
        <Spinner className="w-full" />
      ) : (
        <>
          {hasContactForm && (
            <div className="w-3/4 mx-auto p-4">
              <h1 className="text-3xl font-semibold">{data.page.title}</h1>
              {data.page.editorBlocks?.map((block) => block.attributes.content)}
              <ContactForm />
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
