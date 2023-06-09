import React from "react";
import ReactDOM from "react-dom/client";
import Landing from "./pages/Landing.tsx";
import "./assets/index.css";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/apolloClient.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
