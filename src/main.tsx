import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./assets/index.css";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
