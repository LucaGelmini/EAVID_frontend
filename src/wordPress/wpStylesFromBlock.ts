import { CSSProperties } from "react";
import { EditorBlock } from "../types/queryTypes";
// import { wpParseStylesFromHtml } from "./wpParseStylesFromHtml";
import { wpStylesFromBlockAtributes } from "./wpStylesFromBlockAtributes";
// import DOMPurify from "dompurify";

export const wpStylesFromBlock = (block: EditorBlock): CSSProperties => ({
  // ...wpParseStylesFromHtml(DOMPurify.sanitize(block.renderedHtml)),
  ...wpStylesFromBlockAtributes(block.attributes),
});
