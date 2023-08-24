import parse, {
  attributesToProps,
  HTMLReactParserOptions,
  Element,
  domToReact,
} from "html-react-parser";
import DOMPurify from "dompurify";
import { EditorBlock } from "../../infrastructure/dataTransferObjects/EditorBlock";
import { wpStylesFromBlock } from "../../wordPress/wpStylesFromBlock";
import { Spotify } from "react-spotify-embed";
import { z } from "zod";

type Props = {
  className?: string;
  block: EditorBlock;
};

export const PostH3 = ({ className = "", block }: Props) => {
  const html = DOMPurify.sanitize(block.renderedHtml);
  const style = wpStylesFromBlock(block);

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.attribs) {
        const props = {
          ...attributesToProps(domNode.attribs),
          className,
          style,
        };
        return <h3 {...props}>{domToReact(domNode.children)}</h3>;
      }
    },
  };
  return <>{parse(html, options)}</>;
};

export const PostH2 = ({ className = "", block }: Props) => {
  const html = DOMPurify.sanitize(block.renderedHtml);
  const style = wpStylesFromBlock(block);

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.attribs) {
        const props = {
          ...attributesToProps(domNode.attribs),
          className,
          style,
        };
        return <h2 {...props}>{domToReact(domNode.children)}</h2>;
      }
    },
  };
  return <>{parse(html, options)}</>;
};

export const PostParagraph = ({ className = "", block }: Props) => {
  const html = DOMPurify.sanitize(block.renderedHtml);
  const style = wpStylesFromBlock(block);

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.attribs) {
        const props = {
          ...attributesToProps(domNode.attribs),
          className,
          style,
        };
        return <p {...props}>{domToReact(domNode.children)}</p>;
      }
    },
  };
  return <>{parse(html, options)}</>;
};

export const SpotifyEmbeded = ({ block }: Props) => {
  let url = block.attributes.url;
  const isUrlSchema = z.string().url();
  if (url === undefined || !isUrlSchema.safeParse(url)) return null;
  url = url.replace("/intl-es", "").split("?")[0] + "?utm_source=generator";
  return <Spotify wide link={url} />;
};
