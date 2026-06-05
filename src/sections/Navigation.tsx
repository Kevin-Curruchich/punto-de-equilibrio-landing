import { useEffect, useRef, useState } from "react";
import { getLenis } from "@/hooks/useLenis";
import AnimatedSymbolLogo from "@/components/AnimatedSymbolLogo";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      navRef.current.style.opacity = "0";
      navRef.current.style.transform = "translateY(-10px)";
      const timer = setTimeout(() => {
        if (navRef.current) {
          navRef.current.style.transition =
            "opacity 0.6s ease, transform 0.6s ease, background-color 0.4s ease, backdrop-filter 0.4s ease";
          navRef.current.style.opacity = "1";
          navRef.current.style.transform = "translateY(0)";
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const scrollTo = (id: string) => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(id);
    }
  };

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/punto-de-equilibrio-fisioterapia/evaluacion-gratuita",
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-[10px] shadow-xs"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 max-w-[1400px] mx-auto">
        {/* Left - Logo */}
        <Button
          variant="ghost"
          onClick={() => scrollTo("#hero")}
          className="group h-auto gap-1.5 md:gap-2.5 bg-transparent px-0 py-0 hover:bg-transparent"
        >
          <AnimatedSymbolLogo
            className={`shrink-0 text-k-primary transition-transform duration-300 group-hover:scale-110 ${
              scrolled
                ? "size-11 sm:size-12 md:size-24"
                : "size-12 sm:size-14 md:size-28"
            }`}
          />
          <span
            className={`font-sans tracking-wide text-k-text transition-all duration-300 ${
              scrolled
                ? "text-lg md:text-xl font-semibold"
                : "text-lg sm:text-xl md:text-2xl font-semibold"
            }`}
          >
            Punto de Equilibrio
          </span>
        </Button>

        {/* Center - Tagline */}
        <span className="hidden md:block font-sans text-[10px] font-normal uppercase tracking-[0.1em] text-k-text-secondary">
          FISIOTERAPIA &amp; WELLNESS
        </span>

        {/* Right - CTA Button */}
        <Button
          onClick={openCalendly}
          className="shrink-0 border border-k-primary bg-transparent px-3 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-xs font-medium tracking-wide text-k-primary hover:bg-k-primary hover:text-white transition-all duration-400"
        >
          <span className="sm:hidden">CITA</span>
          <span className="hidden sm:inline">AGENDAR CITA</span>
        </Button>
      </div>
    </nav>
  );
}
