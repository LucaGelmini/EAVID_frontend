import { CSSProperties } from "react";
import { EditorBlock } from "../types/queryTypes";
import { wpParseStylesFromHtml } from "./wpParseStylesFromHtml";
import { wpStylesFromBlockAtributes } from "./wpStylesFromBlockAtributes";

export const wpStylesFromBlock = (block: EditorBlock): CSSProperties => ({
  ...wpParseStylesFromHtml(block.renderedHtml),
  ...wpStylesFromBlockAtributes(block.attributes),
});
