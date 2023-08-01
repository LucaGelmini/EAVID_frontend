import type { ApolloError } from "@apollo/client";

export type UseQueryResult<T> = {
  loading: boolean;
  error?: ApolloError | undefined;
  data: T | undefined;
};
