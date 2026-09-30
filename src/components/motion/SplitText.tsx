import type { CSSProperties } from "react";

type SplitTextProps = {
  text: string;
  className?: string;
  /** Index of the first word, to continue a stagger across several SplitTexts. */
  startIndex?: number;
};

/**
 * Splits text into masked words that rise into place when an ancestor gets
 * `.is-visible` (see `.split-word` in index.css).
 */
export default function SplitText({
  text,
  className,
  startIndex = 0,
}: SplitTextProps) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className={`split-word ${className ?? ""}`}>
            <span
              style={{ "--word-index": startIndex + index } as CSSProperties}
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
