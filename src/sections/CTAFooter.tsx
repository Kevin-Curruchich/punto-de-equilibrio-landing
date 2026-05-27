import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const footerServices = [
  "Fisioterapia Deportiva",
  "Rehabilitación Postquirúrgica",
  "Terapia Manual",
  "Entrenamiento Terapéutico",
  "Masaje Deportivo",
];

export default function CTAFooter() {
  const ctaRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        ctaContentRef.current?.children || [],
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaContentRef.current,
            start: "top 85%",
          },
        },
      );
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/Punto de Equilibrio-fisioterapia/evaluacion-gratuita",
      });
    }
  };

  return (
    <>
      {/* CTA Section */}
      <section
        id="cta"
        ref={ctaRef}
        className="bg-cream py-32 md:py-40 lg:py-[160px]"
      >
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-k-text opacity-0"
          >
            Empieza tu{" "}
            <span className="font-serif italic">recuperación hoy</span>
          </h2>

          <div ref={ctaContentRef} className="mt-6">
            <p className="text-base md:text-[17px] text-k-text-secondary max-w-[480px] mx-auto leading-[1.7] font-sans">
              Agenda tu evaluación inicial gratuita y da el primer paso hacia
              una vida sin dolor.
            </p>

            <Button
              size="lg"
              onClick={openCalendly}
              className="mt-12 bg-k-primary px-12 py-5 text-sm font-medium text-white hover:bg-k-green-dark hover:scale-[1.03] hover:shadow-cta transition-all duration-300 tracking-[0.05em] uppercase"
            >
              AGENDAR EVALUACIÓN GRATUITA
            </Button>

            <p className="mt-5 text-[13px] text-k-text-muted font-sans">
              Primera consulta sin costo · Sin compromiso
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-k-green-dark text-white">
        <div className="max-w-[1200px] mx-auto px-6 pt-16 md:pt-20 pb-10">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand */}
            <div>
              <h3 className="font-serif text-2xl font-normal text-white">
                Punto de Equilibrio
              </h3>
              <p className="mt-2 text-xs text-white/50 font-sans">
                Fisioterapia &amp; Wellness
              </p>
              <p className="mt-4 text-sm text-white/60 font-sans italic">
                Recupera tu movimiento.
              </p>
            </div>

            {/* Services */}
            <div>
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
            <div>
              <h4 className="text-[11px] font-medium text-white/40 uppercase tracking-[0.1em] font-sans mb-5">
                CONTACTO
              </h4>
              <ul className="space-y-1">
                <li className="text-sm text-white/70 font-sans">
                  +52 55 1234 5678
                </li>
                <li>
                  <a
                    href="mailto:hola@Punto de Equilibrio.mx"
                    className="text-sm text-white/70 hover:text-white transition-colors duration-300 font-sans"
                  >
                    hola@Punto de Equilibrio.mx
                  </a>
                </li>
                <li className="text-sm text-white/70 font-sans">
                  Av. Insurgentes Sur 1234, CDMX
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
            <div>
              <h4 className="text-[11px] font-medium text-white/40 uppercase tracking-[0.1em] font-sans mb-5">
                SÍGUENOS
              </h4>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="https://instagram.com"
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
                <a
                  href="https://wa.me/525512345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-300"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
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
