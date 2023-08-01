export type Post<CSSProperties> = {
  id: string;
  desktopJustify: "left" | "center" | "right";
  image: {
    url: string;
    style: CSSProperties;
  };
  title: {
    content: string;
    style: CSSProperties;
  };
  subtitle: {
    content: string;
    style: CSSProperties;
  };
};
