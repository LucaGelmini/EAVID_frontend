import { Post } from "./Post";

type titleVisible<CSSProperties> = {
  visible: true;
  style: CSSProperties;
};
type titleNotVisible = { visible: false };

type IsContactPage =
  | ({ isContactPage: true } & { contactMail: string })
  | { isContactPage: false };

export type Page<CSSProperties> = {
  id: string;
  title:
    | ({ content: string } & (titleVisible<CSSProperties> | titleNotVisible))
    | undefined;
  slug: string;
  content: Post<CSSProperties>[] | undefined;
} & IsContactPage;
