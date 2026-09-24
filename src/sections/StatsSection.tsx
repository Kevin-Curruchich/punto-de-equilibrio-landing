import useRevealOnScroll from "@/hooks/useRevealOnScroll";
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
  const sectionRef = useRevealOnScroll<HTMLElement>();
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
          className="reveal-on-scroll text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.1] tracking-tight text-k-text text-center"
        >
          Tu recuperación{" "}
          <span className="font-serif italic">empieza en casa</span>
        </h2>

        {/* Differentiators Grid */}
        <div
          ref={diffRef}
          className="reveal-on-scroll reveal-stagger mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12"
        >
          {differentiators.map((item, index) => (
            <div
              key={item.title}
              className="text-center"
              style={{ "--reveal-index": index } as React.CSSProperties}
            >
              <div className="flex justify-center">
                <item.icon
                  className="w-10 h-10 text-k-primary"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="mt-6 text-lg font-medium text-k-text font-sans">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] text-k-text-secondary leading-[1.7] font-sans">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
