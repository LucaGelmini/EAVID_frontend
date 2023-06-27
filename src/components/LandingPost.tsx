import type { PostNode } from "../types/queryTypes";
import { v4 as uuidv4 } from "uuid";

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
    const cSSProperties: React.CSSProperties = {
      backgroundImage: (
        mediaQuery === "mobile"
          ? window.innerWidth < 768
          : window.innerWidth > 768
      )
        ? `url(${covers[0].attributes.url})`
        : "none",
      backgroundSize: "cover",
    };
    return cSSProperties;
  };
  return (
    <article
      className={`flex flex-col md:grid  h-full md:grid-cols-2 md:grid-rows-1 ${className}`}
      style={coverImageStyle("mobile")}
    >
      <div className="my-auto h-full">
        <div className="md:bg-transparent" style={coverImageStyle("desktop")}>
          {headings.map((heading) =>
            heading.attributes.level == 1 ? (
              <h1 key={uuidv4()}>{heading.attributes.content}</h1>
            ) : (
              <h2 key={uuidv4()}>{heading.attributes.content}</h2>
            )
          )}
        </div>
        <div>
          {paragraphs.map((paragraph) => (
            <p key={uuidv4()}>{paragraph.attributes.content}</p>
          ))}
        </div>
      </div>
    </article>
  );
};

export default LandingPost;
