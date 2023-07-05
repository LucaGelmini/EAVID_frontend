import React from "react";
import ReactDOM from "react-dom/client";
import Landing from "./pages/Landing.tsx";
import "./assets/index.css";
import { ApolloProvider, gql } from "@apollo/client";
import client from "./graphql/apolloClient.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { ApolloQueryResult } from "@apollo/client";
import Slug from "./pages/Slug.tsx";
import NotFound from "./pages/NotFound.tsx";

const PAGES_SLUG_ID = gql`
  query PagesSlugId {
    pages {
      nodes {
        databaseId
        slug
      }
    }
  }
`;

type pagesSlugId = {
  pages: {
    nodes: Array<{
      databaseId: number;
      slug: string;
    }>;
  };
};

client
  .query({
    query: PAGES_SLUG_ID,
  })
  .then((pagesSlugId: ApolloQueryResult<pagesSlugId>) => {
    console.log("ew");
    const routes = [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      ...pagesSlugId.data.pages.nodes.map((pageSlugID) => ({
        path: "/" + pageSlugID.slug,
        element: <Slug databaseId={pageSlugID.databaseId} />,
      })),
    ];

    const router = createBrowserRouter(routes);

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <React.StrictMode>
        <ApolloProvider client={client}>
          <RouterProvider router={router} />
        </ApolloProvider>
      </React.StrictMode>
    );
  });
