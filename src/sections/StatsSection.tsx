import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bone, Hand, HeartPulse } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  isDecimal?: boolean;
}

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2.0,
  isDecimal = false,
}: CounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            if (isDecimal) {
              setValue(Math.round(obj.val));
            } else {
              setValue(Math.round(obj.val));
            }
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [target, duration, isDecimal]);

  const displayValue = isDecimal ? value.toString() : value.toLocaleString();

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

const differentiators = [
  {
    icon: Bone,
    title: "Rehabilitación Funcional",
    description:
      "Programas personalizados basados en evidencia científica para recuperar la movilidad y fuerza.",
  },
  {
    icon: Hand,
    title: "Terapia Manual",
    description:
      "Técnicas avanzadas de manipulación articular y tejidos blandos para aliviar el dolor y restaurar el movimiento natural.",
  },
  {
    icon: HeartPulse,
    title: "Medicina Deportiva",
    description:
      "Prevención y tratamiento de lesiones deportivas para atletas de todos los niveles, desde aficionados hasta profesionales.",
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const diffRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        },
      );

      // Stats animation with stagger
      if (statsRef.current) {
        const statItems = statsRef.current.children;
        gsap.fromTo(
          statItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
            },
          },
        );
      }

      // Differentiators animation with stagger
      if (diffRef.current) {
        const diffItems = diffRef.current.children;
        gsap.fromTo(
          diffItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: diffRef.current,
              start: "top 85%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
          className="text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.1] tracking-tight text-k-text text-center opacity-0"
        >
          Resultados que{" "}
          <span className="font-serif italic">nos respaldan</span>
        </h2>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mt-16 md:mt-20"
        >
          <div className="text-center opacity-0">
            <div className="text-5xl md:text-6xl lg:text-7xl font-normal text-k-text">
              <AnimatedCounter target={10} prefix="+" />
            </div>
            <p className="mt-3 text-sm text-k-text-secondary font-sans">
              Años de experiencia
            </p>
          </div>

          <div className="text-center opacity-0">
            <div className="text-5xl md:text-6xl lg:text-7xl font-normal text-k-text">
              <AnimatedCounter target={2000} prefix="+" />
            </div>
            <p className="mt-3 text-sm text-k-text-secondary font-sans">
              Pacientes atendidos
            </p>
          </div>

          <div className="text-center opacity-0">
            <div className="text-5xl md:text-6xl lg:text-7xl font-normal text-k-text">
              <AnimatedCounter target={98} suffix="%" />
            </div>
            <p className="mt-3 text-sm text-k-text-secondary font-sans">
              Tasa de recuperación
            </p>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full max-w-[800px] mx-auto my-16 md:my-20">
          <div className="h-px bg-k-line w-full" />
        </div>

        {/* Differentiators Grid */}
        <div
          ref={diffRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12"
        >
          {differentiators.map((item) => (
            <div key={item.title} className="text-center opacity-0">
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
