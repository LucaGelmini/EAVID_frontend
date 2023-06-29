// import { wpStylesFromBlockAtributes } from "../wordPress/wpStylesFromBlockAtributes";
import type { PostNode } from "../types/queryTypes";
import { v4 as uuidv4 } from "uuid";
import { wpStylesFromBlock } from "../wordPress/wpStylesFromBLock";

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

  const coverImageStyle = (mediaQuery: "mobile" | "desktop") => {
    const cssProperties: React.CSSProperties = {
      backgroundImage: (
        mediaQuery === "mobile"
          ? window.innerWidth < 768
          : window.innerWidth > 768
      )
        ? `url(${covers[0].attributes.url})`
        : "none",
      backgroundSize: "cover",
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
        ...wpStylesFromBlock(covers[0]),
        backgroundColor: "transparent",
      }}
    >
      <div
        className="relative md:w-1/2"
        style={{
          ...wpStylesFromBlock(covers[0]),
          ...coverImageStyle("desktop"),
        }}
      >
        {headings.map((heading) =>
          heading.attributes.level === 1 ? (
            <h1
              className="relative text-4xl font-semibold md:m-8"
              style={wpStylesFromBlock(heading)}
              key={uuidv4()}
            >
              {heading.attributes.content}
            </h1>
          ) : (
            <h2
              className="absolute text-2xl font-semibold top-1/2 block w-full m-auto text-center"
              style={wpStylesFromBlock(heading)}
              key={uuidv4()}
            >
              {heading.attributes.content}
            </h2>
          )
        )}
      </div>
      <div className="md:p-8 md:w-1/2">
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
