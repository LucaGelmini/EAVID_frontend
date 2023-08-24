export type EditorBlock = {
  __typename: "CoreHeading" | "CoreParagraph" | "CoreCover" | "CoreEmbed";
  clientId: string;
  parentClientId: string | null;
  renderedHtml: string;
  attributes: CoreBlockAttributes;
};

export type CoreBlockAttributes = {
  __typename: string;
  content?: string;
  align?: "right" | "center" | "left" | null;
  url?: string;
  backgroundType?: string;
  level?: number;
  textColor?: string;
  focalPoint?: string;
  backgroundColor?: string | null;
  overlayColor?: string | null;
  customOverlayColor?: string | null;
  dimRatio?: number | null;
  providerNameSlug?: string;
};

export type CoreHeadingBlock = EditorBlock & {
  __typename: "CoreHeading";
};

export type CoreParagraphBlock = EditorBlock & {
  __typename: "CoreParagraph";
};

export type CoreCoverBlock = EditorBlock & {
  __typename: "CoreCover";
};
