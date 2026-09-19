import type { ContentBlock } from "@/content/services";

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-oberon max-w-[900px]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={i} className="mb-5 mt-12 text-[28px] font-semibold leading-9 text-ink first:mt-0">
                {block.text}
              </h2>
            );

          case "callout":
            return (
              <p
                key={i}
                className="my-8 border-l-[3px] border-primary bg-surface px-7 py-6 text-lg font-medium leading-8 text-ink"
              >
                {block.text}
              </p>
            );

          case "list":
            return (
              <ul key={i} className="my-6 space-y-5">
                {block.items.map((item, j) => (
                  <li key={j} className="relative pl-8">
                    <span className="absolute left-0 top-[11px] h-2 w-2 rounded-full bg-primary" aria-hidden />
                    {item.title ? (
                      <span className="mb-1 block text-[17px] font-semibold text-ink">{item.title}</span>
                    ) : null}
                    <span className="block text-[17px] leading-[30px] text-ink-muted">{item.text}</span>
                  </li>
                ))}
              </ul>
            );

          default:
            return <p key={i}>{block.text}</p>;
        }
      })}
    </div>
  );
}
