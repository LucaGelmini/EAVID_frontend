import { EditorBlock } from "./EditorBlock";

export type PostNodeDTO = {
  id: string;
  title: string;
  editorBlocks: EditorBlock[];
};

export type PostsDTO = {
  posts: {
    nodes: PostNodeDTO[];
  };
};
