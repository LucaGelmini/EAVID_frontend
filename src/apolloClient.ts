import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://eavid.online/cms/graphql",
  cache: new InMemoryCache(),
});

export default client;
