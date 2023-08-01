import React from "react";
import ReactDOM from "react-dom/client";
import Landing from "./pages/Landing.tsx";
import "./assets/index.css";
import { ApolloProvider, gql } from "@apollo/client";
import client from "../infrastructure/graphql/apolloClient.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { ApolloQueryResult } from "@apollo/client";
import Slug from "./pages/Slug.tsx";
import NotFound from "./pages/NotFound.tsx";
import { ChakraProvider } from "@chakra-ui/react";

const PAGES_SLUG_ID = gql`
  query PagesSlugId {
    pages {
      nodes {
        databaseId
        slug
        contactFormPage {
          paginaDeContacto
          correoDeContacto
        }
      }
    }
  }
`;

type pagesSlugId = {
  pages: {
    nodes: Array<{
      databaseId: number;
      slug: string;
      contactFormPage: {
        paginaDeContacto: boolean | null;
        correoDeContacto: string | null;
      };
    }>;
  };
};

client
  .query({
    query: PAGES_SLUG_ID,
  })
  .then((pagesSlugId: ApolloQueryResult<pagesSlugId>) => {
    const routes = [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      ...pagesSlugId.data.pages.nodes.map((pageSlugID) => {
        const { paginaDeContacto, correoDeContacto } =
          pageSlugID.contactFormPage !== undefined
            ? pageSlugID.contactFormPage
            : { paginaDeContacto: false, correoDeContacto: "" };
        return {
          path: "/" + pageSlugID.slug,
          element: (
            <Slug
              databaseId={pageSlugID.databaseId}
              hasContactForm={paginaDeContacto}
              contactMail={correoDeContacto}
            />
          ),
        };
      }),
    ];

    const router = createBrowserRouter(routes);

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <React.StrictMode>
        <ApolloProvider client={client}>
          <ChakraProvider>
            <RouterProvider router={router} />
          </ChakraProvider>
        </ApolloProvider>
      </React.StrictMode>
    );
  });
