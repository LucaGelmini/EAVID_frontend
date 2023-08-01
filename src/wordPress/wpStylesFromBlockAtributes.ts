import type { CoreBlockAttributes } from "../ui/types/queryTypes";
import type { CSSProperties } from "react";
export const wpStylesFromBlockAtributes = (
  blockAtributes: CoreBlockAttributes
): CSSProperties => {
  const focalPoint =
    blockAtributes.focalPoint != undefined || blockAtributes.focalPoint != null
      ? (JSON.parse(blockAtributes.focalPoint) as { x: number; y: number })
      : { x: 0.5, y: 0.5 };

  const overlayColor =
    blockAtributes.overlayColor != null
      ? blockAtributes.overlayColor
      : blockAtributes.customOverlayColor;

  const style: CSSProperties = {
    color: blockAtributes.textColor,
    background: coverImageBackground(
      blockAtributes.url,
      overlayColor,
      blockAtributes.dimRatio
    ),
    backgroundPositionX: `${focalPoint.x * 100}%`,
    backgroundPositionY: `${focalPoint.y * 100}%`,
  };
  return style;
};

function colorToRGB(
  color: string | null | undefined,
  alpha: number | null | undefined
) {
  if (color == null || color == undefined) return null;
  alpha = typeof alpha === "number" ? alpha / 100 : 1;
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const rgb = [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16),
    ];
    return `rgba(${rgb.join(", ")}, ${alpha})`;
  } else if (color.startsWith("rgba") || color.startsWith("rgb")) {
    // Split the color by commas and remove the rgba() or rgb()
    const values = color.replace(/rgba?\(|\)/gi, "").split(",");
    // Replace the alpha value if it exists, otherwise add it
    if (values.length === 4) {
      values[3] = String(alpha);
    } else {
      values.push(String(alpha));
    }
    return `rgba(${values.join(", ")})`;
  } else {
    const dummyDiv = document.createElement("div");
    dummyDiv.style.color = color;
    document.body.appendChild(dummyDiv);
    const colorStyle = window.getComputedStyle(dummyDiv).color;
    document.body.removeChild(dummyDiv);
    // Add the alpha value to the RGB color
    const values = colorStyle.replace(/rgb\(|\)/gi, "").split(",");
    values.push(String(alpha));
    return `rgba(${values.join(", ")})`;
  }
}

function coverImageBackground(
  url: string | null | undefined,
  overlayColor: undefined | string | null,
  dimRatio: number | null | undefined
) {
  if (!url && !overlayColor) return "";
  if (overlayColor == undefined || overlayColor == null) {
    return `url(${url})`;
  }
  if (url == undefined) {
    return `linear-gradient(${colorToRGB(overlayColor, dimRatio)},${colorToRGB(
      overlayColor,
      dimRatio
    )}) url(${url})`;
  }
  const bg = `linear-gradient(${colorToRGB(
    overlayColor,
    dimRatio
  )},${colorToRGB(overlayColor, dimRatio)}), url(${url})`;
  return bg;
}
