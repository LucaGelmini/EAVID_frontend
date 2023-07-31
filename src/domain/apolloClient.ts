import { ApolloClient, InMemoryCache } from "@apollo/client";
import options from "../infrastructure/domain.config";

const client = new ApolloClient({
  uri: options.graphQlEndpoint,
  cache: new InMemoryCache(),
});

export default client;
