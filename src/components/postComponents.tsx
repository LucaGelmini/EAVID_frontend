import parse, {
  attributesToProps,
  HTMLReactParserOptions,
  Element,
  domToReact,
} from "html-react-parser";
import DOMPurify from "dompurify";
import { EditorBlock } from "../types/queryTypes";
import { wpStylesFromBlock } from "../wordPress/wpStylesFromBlock";

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
