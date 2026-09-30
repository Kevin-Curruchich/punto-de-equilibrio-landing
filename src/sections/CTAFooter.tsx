import { useState, type CSSProperties } from "react";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import SplitText from "@/components/motion/SplitText";
import { useMagnetic, usePointerParallax } from "@/hooks/useMotion";
import { Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import GoogleCalendarBookingDialog from "@/components/GoogleCalendarBookingDialog";
import { trackEvent } from "@/lib/firebase";

const footerServices = [
  "Lesiones musculares",
  "Terapia neurológica",
  "Fisioterapia geriátrica",
  "Fisioterapia pediátrica",
  "Dolor y rehabilitación musculoesquelética",
];

export default function CTAFooter() {
  const ctaRef = usePointerParallax<HTMLElement>();
  const wavesRef = useRevealOnScroll<HTMLDivElement>();
  const buttonRef = useMagnetic<HTMLDivElement>(0.3);
  const footerRef = useRevealOnScroll<HTMLDivElement>();
  const headingRef = useRevealOnScroll<HTMLHeadingElement>();
  const ctaContentRef = useRevealOnScroll<HTMLDivElement>();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      {/* CTA Section */}
      <section
        id="cta"
        ref={ctaRef}
        className="relative overflow-hidden bg-cream py-32 md:py-40 lg:py-[160px]"
      >
        <div
          ref={wavesRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="parallax-layer absolute -left-24 top-1/4"
            style={{ "--depth": "-36px" } as CSSProperties}
          >
            <div className="hero-blob h-80 w-80 rounded-full bg-[#dfeef3] blur-3xl opacity-80" />
          </div>
          <div
            className="parallax-layer absolute -right-20 bottom-0"
            style={{ "--depth": "44px" } as CSSProperties}
          >
            <div className="hero-blob hero-blob-delay-1 h-96 w-96 rounded-full bg-[#f3e7dc] blur-3xl opacity-80" />
          </div>
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1440 700"
            preserveAspectRatio="xMidYMid slice"
          >
            {[
              "M-40 520C160 460 280 600 460 560C640 520 700 400 900 420C1100 440 1200 560 1480 500",
              "M-40 580C200 540 300 660 520 620C720 584 780 480 980 500C1160 518 1260 610 1480 580",
            ].map((d, index) => (
              <g key={d}>
                <path
                  d={d}
                  pathLength={1}
                  fill="none"
                  stroke="rgba(81,126,150,0.2)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="draw-on-visible"
                  style={
                    { "--draw-delay": `${index * 250}ms` } as CSSProperties
                  }
                />
                <path
                  d={d}
                  pathLength={1}
                  fill="none"
                  stroke="rgba(99,178,163,0.6)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="flow-pulse"
                  style={
                    { "--flow-delay": `${2000 + index * 2500}ms` } as CSSProperties
                  }
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="relative max-w-[800px] mx-auto px-6 text-center">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-k-text"
          >
            <SplitText text="Empieza tu" />{" "}
            <SplitText
              text="recuperación hoy"
              startIndex={2}
              className="font-serif italic"
            />
          </h2>

          <div ref={ctaContentRef} className="reveal-on-scroll mt-6">
            <p className="text-base md:text-[17px] text-k-text-secondary max-w-[480px] mx-auto leading-[1.7] font-sans">
              Agenda tu evaluación inicial y da el primer paso hacia una vida
              sin dolor.
            </p>

            <div ref={buttonRef} className="magnetic mx-auto mt-12 max-w-[320px]">
              <Button
                size="lg"
                onClick={() => {
                  void trackEvent("booking_open", { location: "footer" });
                  setIsBookingOpen(true);
                }}
                className="btn-shine w-full bg-k-primary px-6 py-5 text-sm font-medium text-white hover:bg-k-green-dark hover:shadow-cta transition-all duration-300 tracking-[0.05em] uppercase"
              >
                AGENDAR EVALUACIÓN
              </Button>
            </div>

            <p className="mt-5 text-[13px] text-k-text-muted font-sans">
              Atención personalizada en la comodidad de tu hogar
            </p>
          </div>
        </div>
      </section>

      <GoogleCalendarBookingDialog
        open={isBookingOpen}
        onOpenChange={setIsBookingOpen}
      />

      {/* Footer */}
      <footer className="bg-k-green-dark text-white">
        <div className="max-w-[1200px] mx-auto px-6 pt-16 md:pt-20 pb-10">
          {/* Footer Grid */}
          <div
            ref={footerRef}
            className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
          >
            {/* Brand */}
            <div style={{ "--reveal-index": 0 } as CSSProperties}>
              <h3 className="font-serif text-2xl font-normal text-white">
                <span className="font-poppins not-italic">Punto de </span>
                <span className="italic">Equilibrio</span>
              </h3>
              <p className="mt-2 text-xs text-white/50 font-sans">
                Fisioterapia &amp; Wellness
              </p>
            </div>

            {/* Services */}
            <div style={{ "--reveal-index": 1 } as CSSProperties}>
              <h4 className="text-[11px] font-medium text-white/40 uppercase tracking-[0.1em] font-sans mb-5">
                SERVICIOS
              </h4>
              <ul className="space-y-1">
                {footerServices.map((service) => (
                  <li key={service}>
                    <span className="text-sm text-white/70 hover:text-white transition-colors duration-300 font-sans cursor-default">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div style={{ "--reveal-index": 2 } as CSSProperties}>
              <h4 className="text-[11px] font-medium text-white/40 uppercase tracking-[0.1em] font-sans mb-5">
                CONTACTO
              </h4>
              <ul className="space-y-1">
                <li className="text-sm text-white/70 font-sans">
                  +502 3371 2445
                </li>
                <li>
                  <a
                    href="mailto:info@punto-de-equilibrio.com"
                    className="text-sm text-white/70 hover:text-white transition-colors duration-300 font-sans"
                  >
                    info@punto-de-equilibrio.com
                  </a>
                </li>
                <li className="text-sm text-white/70 font-sans">
                  Lun-Vie: 8:00 - 20:00
                </li>
                <li className="text-sm text-white/70 font-sans">
                  Sáb: 9:00 - 14:00
                </li>
              </ul>
            </div>

            {/* Social */}
            <div style={{ "--reveal-index": 3 } as CSSProperties}>
              <h4 className="text-[11px] font-medium text-white/40 uppercase tracking-[0.1em] font-sans mb-5">
                SÍGUENOS
              </h4>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="https://www.instagram.com/puntoequilibrio26/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-white/10 mt-14 md:mt-16 mb-8 md:mb-10" />

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40 font-sans">
              © {new Date().getFullYear()} Punto de Equilibrio Fisioterapia.
              Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="/terminos-y-condiciones"
                className="text-xs text-white/40 hover:text-white/70 transition-colors duration-300 font-sans"
              >
                Términos y Condiciones
              </a>
              <a
                href="/eliminar-cuenta"
                className="text-xs text-white/40 hover:text-white/70 transition-colors duration-300 font-sans"
              >
                Eliminar cuenta
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
