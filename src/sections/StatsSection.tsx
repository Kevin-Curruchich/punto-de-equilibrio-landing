import type { CSSProperties } from "react";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import SplitText from "@/components/motion/SplitText";
import { useInViewAnimations } from "@/hooks/useMotion";
import { ClipboardCheck, HeartPulse, Home } from "lucide-react";

const differentiators = [
  {
    icon: Home,
    title: "Atención en tu hogar",
    description:
      "Recibe tu sesión en un espacio familiar, sin traslados ni esperas en una clínica.",
  },
  {
    icon: ClipboardCheck,
    title: "Evaluación personalizada",
    description:
      "Conocemos tu caso y tus objetivos para diseñar un plan de tratamiento adecuado para ti.",
  },
  {
    icon: HeartPulse,
    title: "Acompañamiento cercano",
    description:
      "Te guiamos paso a paso para recuperar movimiento, autonomía y calidad de vida.",
  },
];

export default function StatsSection() {
  const sectionRef = useInViewAnimations<HTMLElement>();
  const headingRef = useRevealOnScroll<HTMLHeadingElement>();
  const diffRef = useRevealOnScroll<HTMLDivElement>();

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="bg-cream py-24 md:py-32 lg:py-[120px]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.1] tracking-tight text-k-text text-center"
        >
          <SplitText text="Tu recuperación" />{" "}
          <SplitText
            text="empieza en casa"
            startIndex={2}
            className="font-serif italic"
          />
        </h2>

        {/* Recovery journey */}
        <div ref={diffRef} className="relative mt-16 md:mt-20">
          {/* Connecting path between the three steps (desktop) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-6 hidden h-12 w-[66.66%] md:block"
          >
            <path
              d="M0 30C80 0 170 0 250 30C330 60 420 60 500 30C580 0 670 0 750 30C830 60 920 60 1000 30"
              pathLength={1}
              fill="none"
              stroke="rgba(53,118,155,0.18)"
              strokeWidth="2"
              strokeDasharray="0.01 0.012"
            />
            <path
              d="M0 30C80 0 170 0 250 30C330 60 420 60 500 30C580 0 670 0 750 30C830 60 920 60 1000 30"
              pathLength={1}
              fill="none"
              stroke="#63B2A3"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="draw-on-visible"
              style={{ "--draw-delay": "500ms" } as CSSProperties}
            />
          </svg>

          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-12">
            {differentiators.map((item, index) => (
              <div
                key={item.title}
                className="group relative text-center"
                style={{ "--reveal-index": index } as CSSProperties}
              >
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="pulse-ring absolute inset-2 rounded-full border border-k-primary/40"
                    style={
                      { "--pulse-delay": `${index * 1200}ms` } as CSSProperties
                    }
                  />
                  <span
                    aria-hidden="true"
                    className="pulse-ring absolute inset-2 rounded-full bg-k-green-light/15"
                    style={
                      {
                        "--pulse-delay": `${index * 1200 + 600}ms`,
                      } as CSSProperties
                    }
                  />
                  <span className="journey-icon relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-k-line bg-white text-k-primary shadow-sm group-hover:bg-k-primary group-hover:text-white">
                    <item.icon className="h-8 w-8" strokeWidth={1.5} />
                  </span>
                  <span className="absolute -right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-k-green-dark text-[11px] font-medium text-white">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-medium text-k-text font-sans">
                  {item.title}
                </h3>
                <p className="mx-auto mt-3 max-w-[320px] text-[15px] text-k-text-secondary leading-[1.7] font-sans">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
