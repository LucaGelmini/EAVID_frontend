import type { CoreBlockAttributes } from "../types/queryTypes";
import type { CSSProperties } from "react";
export const wordpressStylesFromBlock = (
  blockAtributes: CoreBlockAttributes
): CSSProperties => {
  console.log(blockAtributes.__typename, blockAtributes.textColor);
  return {
    color: blockAtributes.textColor,
  };
};
