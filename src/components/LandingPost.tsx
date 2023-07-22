import type { EditorBlock, PostNode } from "../types/queryTypes";
import { v4 as uuidv4 } from "uuid";
import { wpStylesFromBlock } from "../wordPress/wpStylesFromBlock";
import { PostH2, PostH3, PostParagraph } from "./postComponents";

interface Props {
  node: PostNode | undefined;
  className?: string;
}

const LandingPost = ({ node, className = "" }: Props) => {
  if (node === undefined) return;
  const headings: EditorBlock[] | undefined[] = node.editorBlocks.filter(
    (block) => block.__typename == "CoreHeading"
  );
  const covers: EditorBlock[] | undefined[] = node.editorBlocks.filter(
    (block) => block.__typename == "CoreCover"
  );
  const paragraphs: EditorBlock[] | undefined[] = node.editorBlocks.filter(
    (block) => block.__typename == "CoreParagraph"
  );

  const coverImageStyle = (
    mediaQuery: "mobile" | "desktop",
    style: React.CSSProperties
  ) => {
    const hasBackground =
      mediaQuery === "mobile"
        ? window.innerWidth < 768
        : window.innerWidth > 768;

    const cssProperties: React.CSSProperties = {
      ...style,
      background: hasBackground ? style.background : "transparent",
      backgroundSize: "cover",
      opacity: 100,
    };
    return cssProperties;
  };

  return (
    <article
      className={`flex flex-col flex-1 min-h-fit p-8 md:p-0 ${
        covers.length > 0 && covers[0].attributes.align === "right"
          ? "md:flex-row-reverse"
          : "md:flex-row"
      } ${className}`}
      style={
        covers.length > 0
          ? {
              ...coverImageStyle("mobile", wpStylesFromBlock(covers[0])),
              backgroundColor: "transparent",
            }
          : {}
      }
    >
      <div
        className="relative md:w-1/2"
        style={
          covers.length > 0
            ? coverImageStyle("desktop", wpStylesFromBlock(covers[0]))
            : {}
        }
      >
        {headings.length > 0 &&
          headings.map((heading) =>
            heading.attributes.level === 1 ? (
              <div
                className="inline-block border-black border-x-2 p-2 bg-eavid-500 skew-y-6 transform-gpu -rotate-6 m-4"
                key={uuidv4()}
              >
                <PostH2
                  block={heading}
                  className="relative text-4xl font-semibold -skew-y-6 transform-gpu rotate-6"
                  key={uuidv4()}
                />
              </div>
            ) : (
              <PostH3
                key={uuidv4()}
                block={heading}
                className="absolute my-10 md:my-0 text-2xl font-semibold top-1/2 block w-full m-auto text-center"
              />
            )
          )}
      </div>
      <div className=" text-xl my-10 md:my-0 md:p-8 md:w-1/2">
        {paragraphs.length > 0 &&
          paragraphs.map((paragraph) => (
            <PostParagraph key={uuidv4()} block={paragraph} />
          ))}
      </div>
    </article>
  );
};

export default LandingPost;
