import type { CSSProperties } from "react";

export const wpParseStylesFromHtml = (renderedHtml: string) => {
  // console.log(">>>>>>", renderedHtml);
  const wrapper = document.createElement("div");
  wrapper.innerHTML = renderedHtml;

  const element = wrapper.querySelector("h2");
  if (!element) {
    return null;
  }

  const styles: CSSProperties = {};

  // Extract the relevant CSS properties
  styles.color = element.style.color;

  // Parse the background color to extract RGB and alpha values
  const backgroundColor = element.style.backgroundColor;
  const rgba = backgroundColor.match(
    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
  );
  if (rgba) {
    styles.backgroundColor = `rgb(${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
    styles.opacity = parseFloat(rgba[4]);
  }
  console.log(">>", element.style.backgroundColor);
  return styles;
};
