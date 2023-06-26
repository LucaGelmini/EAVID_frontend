interface Node {
  id: string;
  title: string;
  editorBlocks: EditorBlock[];
}

interface EditorBlock {
  __typename: "CoreHeading" | "CoreParagraph" | "CoreCover";
  clientId: string;
  parentClientId: string | null;
  attributes: {
    content?: string;
    align?: string;
    url?: string;
    backgroundType?: string;
    level?: number;
  };
}

interface Props {
  node: Node;
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
  return (
    <article
      className={`grid grid-cols-1 h-full md:grid-cols-2 md:grid-rows-1 ${className}`}
      style={{
        backgroundImage:
          window.innerWidth < 768 ? `url(${covers[0].attributes.url})` : "none",
      }}
    >
      <div
        className="md:bg-transparent"
        style={{
          backgroundImage:
            window.innerWidth > 768
              ? `url(${covers[0].attributes.url})`
              : "none",
        }}
      >
        {headings.map((heading) =>
          heading.attributes.level == 1 ? (
            <h1>{heading.attributes.content}</h1>
          ) : (
            <h2>{heading.attributes.content}</h2>
          )
        )}
      </div>
      <div>
        {paragraphs.map((paragraph) => (
          <p>{paragraph.attributes.content}</p>
        ))}
      </div>
    </article>
  );
};

export default LandingPost;
