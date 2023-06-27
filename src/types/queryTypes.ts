import type { ApolloError } from "@apollo/client";

export type UseQueryResult<T> = {
  loading: boolean;
  error?: ApolloError | undefined;
  data: T | undefined;
};

export type DataObject<T> = {
  data: T;
  extensions: Extensions;
};

export type Extensions = {
  debug: any[];
  queryAnalyzer: QueryAnalyzer;
};

export type QueryAnalyzer = {
  keys: string;
  keysLength: number;
  keysCount: number;
  skippedKeys: string;
  skippedKeysSize: number;
  skippedKeysCount: number;
  skippedTypes: any[];
};

export type PostsData = {
  posts: {
    nodes: PostNode[];
  };
};

export type PostNode = {
  id: string;
  title: string;
  editorBlocks: EditorBlock[];
};

export type EditorBlock = {
  __typename: "CoreHeading" | "CoreParagraph" | "CoreCover";
  clientId: string;
  parentClientId: string | null;
  attributes: {
    content?: string;
    align?: string;
    url?: string;
    backgroundType?: string;
    level?: number;
  };
};

export type CoreBlockAttributes<T> = {
  content?: T;
  align?: T;
  url?: T;
  backgroundType?: T;
  level?: T;
};

export type CoreHeadingBlock = EditorBlock & {
  __typename: "CoreHeading";
  attributes: CoreBlockAttributes<string>;
};

export type CoreParagraphBlock = EditorBlock & {
  __typename: "CoreParagraph";
  attributes: CoreBlockAttributes<string>;
};

export type CoreCoverBlock = EditorBlock & {
  __typename: "CoreCover";
  attributes: CoreBlockAttributes<string>;
  innerBlocks: EditorBlock[];
};
