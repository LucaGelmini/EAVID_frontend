import React, { useState, useEffect } from "react";
import Landing from "./pages/Landing.tsx";
import "./assets/index.css";
import { ApolloProvider } from "@apollo/client";
import client from "../infrastructure/graphql/apolloClient.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Slug from "./pages/Slug.tsx";
import NotFound from "./pages/NotFound.tsx";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Spinner from "./components/Spinner.tsx";
import pagesSlug from "../infrastructure/repositories/pagesSlug.repository.ts";
import { useQuery } from "react-query";

const fetchAndCreateRouter = async () => {
  const { pages, error } = await pagesSlug();
  if (error) throw new Error("[500] Fetching pages slugs: " + error);

  const routes = [
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    ...pages.map((page) => {
      return {
        path: "/" + page.slug,
        element:
          page.isContactPage === true ? (
            <Slug
              databaseId={page.id}
              hasContactForm={true}
              contactMail={page.contactMail}
            />
          ) : (
            <Slug
              databaseId={page.id}
              hasContactForm={false}
              contactMail={null}
            />
          ),
      };
    }),
  ];
  return createBrowserRouter(routes);
};

const App = () => {
  const { data: router, isLoading } = useQuery(
    "routerData",
    fetchAndCreateRouter
  );

  if (isLoading || router === undefined) {
    return (
      <Box className="w-full h-screen flex justify-center items-center">
        <Spinner w="w-24" h="w-24" className=" align-middle m-auto" />
      </Box>
    );
  }

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default App;
