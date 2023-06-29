import type { CoreBlockAttributes } from "../types/queryTypes";
import type { CSSProperties } from "react";
export const wpStylesFromBlockAtributes = (
  blockAtributes: CoreBlockAttributes
): CSSProperties => {
  const focalPoint =
    blockAtributes.focalPoint !== undefined
      ? JSON.parse(blockAtributes.focalPoint)
      : { x: 0.5, y: 0.5 };
  const style: CSSProperties = {
    color: blockAtributes.textColor,
    backgroundPositionX: `${focalPoint.x * 100}%`,
    backgroundPositionY: `${focalPoint.y * 100}%`,
  };
  return style;
};
