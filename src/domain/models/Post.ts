export type PostCoverImage<CSSProperties> = {
  url: string;
  style: CSSProperties;
};

export type PostTitle<CSSProperties> = {
  content: string;
  style: CSSProperties;
};

export type PostSubtitle<CSSProperties> = {
  content: string;
  style: CSSProperties;
};

export type PostParagraphs<CSSProperties> = Array<{
  content: string;
  style: CSSProperties;
}>;
export type Post<CSSProperties> = {
  id: string;
  desktopJustify: "left" | "center" | "right";
  image: PostCoverImage<CSSProperties>;
  title: PostTitle<CSSProperties>;
  subtitle: PostSubtitle<CSSProperties> | null;
  paragraphs: PostParagraphs<CSSProperties>;
};
