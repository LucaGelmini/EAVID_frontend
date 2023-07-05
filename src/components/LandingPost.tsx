// import { wpStylesFromBlockAtributes } from "../wordPress/wpStylesFromBlockAtributes";
import type { PostNode } from "../types/queryTypes";
import { v4 as uuidv4 } from "uuid";
import { wpStylesFromBlock } from "../wordPress/wpStylesFromBlock";

interface Props {
  node: PostNode;
  className?: string;
}

const LandingPost = ({ node, className = "" }: Props) => {
  const headings = node.editorBlocks.filter(
    (block) => block.__typename == "CoreHeading"
  );
  const covers = node.editorBlocks.filter(
    (block) => block.__typename == "CoreCover"
  );
  const paragraphs = node.editorBlocks.filter(
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
        covers[0].attributes.align === "right"
          ? "md:flex-row-reverse"
          : "md:flex-row"
      } ${className}`}
      style={{
        ...coverImageStyle("mobile", wpStylesFromBlock(covers[0])),
        backgroundColor: "transparent",
      }}
    >
      <div
        className="relative md:w-1/2"
        style={coverImageStyle("desktop", wpStylesFromBlock(covers[0]))}
      >
        {headings.map((heading) =>
          heading.attributes.level === 1 ? (
            <div
              className="inline-block border-black border-x-2 p-2 bg-eavid-500 skew-y-6 transform-gpu -rotate-6 m-4"
              key={uuidv4()}
            >
              <h2
                className="relative text-4xl font-semibold -skew-y-6 transform-gpu rotate-6"
                style={wpStylesFromBlock(heading)}
                key={uuidv4()}
              >
                {heading.attributes.content}
              </h2>
            </div>
          ) : (
            <h3
              className="absolute text-2xl font-semibold top-1/2 block w-full m-auto text-center"
              style={wpStylesFromBlock(heading)}
              key={uuidv4()}
            >
              {heading.attributes.content}
            </h3>
          )
        )}
      </div>
      <div className=" text-lg md:p-8 md:w-1/2">
        {paragraphs.map((paragraph) => (
          <p style={wpStylesFromBlock(paragraph)} key={uuidv4()}>
            {paragraph.attributes.content}
          </p>
        ))}
      </div>
    </article>
  );
};

export default LandingPost;
