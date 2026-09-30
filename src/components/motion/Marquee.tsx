import { useInViewAnimations } from "@/hooks/useMotion";

const words = [
  "Movilidad",
  "Fuerza",
  "Equilibrio",
  "Autonomía",
  "Bienestar",
  "Confianza",
];

function MarqueeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {words.map((word, index) => (
        <span key={word} className="flex items-center gap-10 md:gap-14">
          <span
            className={
              index % 2 === 0
                ? "font-serif italic text-k-text"
                : "marquee-outline font-poppins"
            }
          >
            {word}
          </span>
          <svg
            viewBox="0 0 24 24"
            className="marquee-dot h-5 w-5 text-k-primary md:h-6 md:w-6"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="1.5"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}

/** Infinite band of the values the treatment works on. */
export default function Marquee() {
  const sectionRef = useInViewAnimations<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      aria-label="Lo que trabajamos contigo"
      className="marquee relative overflow-hidden border-y border-k-line bg-cream py-8 md:py-10"
    >
      <div className="marquee-track text-4xl md:text-6xl lg:text-7xl leading-none">
        <MarqueeGroup />
        <MarqueeGroup hidden />
      </div>
    </section>
  );
}
