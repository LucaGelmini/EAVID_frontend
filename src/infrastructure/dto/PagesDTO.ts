import { EditorBlock } from "./EditorBlock";

export type PageNodeDTO = {
  databaseId: number;
  id?: string;
  title: string;
  slug?: string;
  editorBlocks?: EditorBlock[];
};

export type PagesDTO = {
  pages: {
    nodes: PageNodeDTO[];
  };
};
