import { useEffect, useRef } from "react";
import gsap from "gsap";
import WaveCanvas from "@/components/WaveCanvas";
import { getLenis } from "@/hooks/useLenis";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      titleLine1Ref.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
    )
      .fromTo(
        titleLine2Ref.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        "-=1.0",
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6",
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3",
      )
      .fromTo(
        badgeRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.2",
      )
      .fromTo(
        chevronRef.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 0.6, ease: "power2.out" },
        "-=0.2",
      );

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToStats = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo("#stats");
    }
  };

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/Punto de Equilibrio-fisioterapia/evaluacion-gratuita",
      });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 3D Canvas Background */}
      <WaveCanvas />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(245,244,241,0.88) 0%, rgba(245,244,241,0.45) 100%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight text-k-text">
          <div ref={titleLine1Ref} className="opacity-0">
            Recupera tu
          </div>
          <div ref={titleLine2Ref} className="opacity-0">
            <span className="font-serif italic">movimiento.</span>
          </div>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-6 text-base leading-[1.7] text-k-text-secondary max-w-[480px] opacity-0"
        >
          Fisioterapia especializada para lesiones, rehabilitación y dolor
          crónico. Recupera tu calidad de vida con tratamientos personalizados.
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          ref={ctaRef}
          onClick={openCalendly}
          className="mt-10 bg-k-primary text-white px-10 py-4 text-sm font-medium hover:bg-k-green-dark hover:scale-[1.03] hover:shadow-cta transition-all duration-300 opacity-0"
        >
          Reservar Evaluación
        </Button>

        {/* Trust Badge */}
        <div ref={badgeRef} className="mt-16 flex items-center gap-2 opacity-0">
          <span className="w-2 h-2 rounded-full bg-k-secondary" />
          <span className="text-sm text-k-text-secondary font-sans">
            +500 pacientes recuperados
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={chevronRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0 cursor-pointer"
        onClick={scrollToStats}
      >
        <ChevronDown className="w-6 h-6 text-k-text-muted animate-bounce-down" />
      </div>
    </section>
  );
}
