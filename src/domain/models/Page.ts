import { Post } from "./Post";

type titleVisible<CSSProperties> = {
  visible: true;
  style: CSSProperties;
};
type titleNotVisible = { visible: false };

export type Page<CSSProperties> = {
  id: string;
  title: { content: string } & (titleVisible<CSSProperties> | titleNotVisible);
  slug: string;
  content: Post<CSSProperties>[];
};
