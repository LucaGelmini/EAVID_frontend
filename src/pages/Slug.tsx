import { useQuery } from "@apollo/client";
import type { UseQueryResult, PageNode, PostsData } from "../types/queryTypes";
import pageQuery from "../graphql/pageQuery.graphql";
import Main from "../layouts/Main";
import Spinner from "../ui/Spinner";
import landingPostsQuery from "../graphql/landingPostsQuery.graphql";
import LandingPost from "../components/LandingPost";
import ContactForm from "../components/ContactForm";

type Props = {
  databaseId: number;
};

const Slug = ({ databaseId }: Props) => {
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

  const {
    loading: postsLoading,
    error: postsError,
    data: postsData,
  }: UseQueryResult<PostsData> = useQuery(landingPostsQuery, {
    variables: { categoryName: data?.page.slug },
  });
  if (postsError) {
    console.error(postsError);
  }

  return (
    <Main>
      {data === undefined || loading ? (
        <Spinner className="w-full" />
      ) : (
        <>
          <div className="w-3/4 mx-auto p-4">
            <h1 className="text-3xl font-semibold">{data.page.title}</h1>
            {data.page.editorBlocks?.map((block) => block.attributes.content)}
            <ContactForm />
          </div>
          <div>
            {postsData === undefined || postsLoading ? (
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
