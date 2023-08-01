import { Page } from "../../domain/models/Page";
import { CSSProperties as ReactCSSProperties } from "react";

export const pagina: Page<ReactCSSProperties> = {
  id: "fsdf",
  title: {
    content: "asdfdg",
    visible: true,
    style: { coso: "fdf" } as ReactCSSProperties,
  },
  content: [
    {
      id: "fdsfgds",
      desktopJustify: "center",
      image: {
        url: "fdsgfd",
        style: { coso: "rwdfg" } as ReactCSSProperties,
      },
    },
  ],
};
