import type { CoreBlockAttributes } from "../types/queryTypes";
import type { CSSProperties } from "react";
export const wordpressStylesFromBlock = (
  blockAtributes: CoreBlockAttributes
): CSSProperties => {
  const focalPoint =
    blockAtributes.focalPoint !== undefined
      ? JSON.parse(blockAtributes.focalPoint)
      : { x: 0.5, y: 0.5 };
  const style = {
    color: blockAtributes.textColor,
    backgroundPositionX: `${focalPoint.x * 100}%`,
    backgroundPositionY: `${focalPoint.y * 100}%`,
  };
  console.log(blockAtributes.__typename, focalPoint);
  return style;
};
