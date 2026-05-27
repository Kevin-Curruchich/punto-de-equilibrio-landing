import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Fisioterapia Deportiva",
    description:
      "Evaluación biomecánica, tratamiento de lesiones musculares, ligamentosas y articulares. Vuelve a tu disciplina más fuerte.",
  },
  {
    number: "02",
    title: "Rehabilitación Postquirúrgica",
    description:
      "Recuperación guiada tras cirugía ortopédica. Protocolos personalizados para una vuelta segura a la actividad.",
  },
  {
    number: "03",
    title: "Terapia Manual Ortopédica",
    description:
      "Manipulaciones articulares específicas, movilización neural y técnicas de liberación miofascial para eliminar el dolor.",
  },
  {
    number: "04",
    title: "Entrenamiento Terapéutico",
    description:
      "Ejercicios funcionales progresivos para fortalecer, estabilizar y prevenir futuras lesiones.",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        },
      );

      // Cards animation with stagger from left
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="servicios"
      ref={sectionRef}
      className="bg-white py-24 md:py-32 lg:py-[120px]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center opacity-0">
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.1] tracking-tight text-k-text">
            Nuestros <span className="font-serif italic">servicios</span>
          </h2>
          <p className="mt-4 text-base text-k-text-secondary font-sans">
            Tratamientos especializados adaptados a tus necesidades
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-20"
        >
          {services.map((service) => (
            <div
              key={service.number}
              className="bg-cream border border-k-line rounded-lg p-8 md:p-10 opacity-0 hover:-translate-y-1 hover:shadow-card transition-all duration-400 group"
            >
              <span className="text-xs font-medium text-k-text-muted font-sans">
                {service.number}
              </span>
              <h3 className="mt-5 text-lg font-medium text-k-text font-sans">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-k-text-secondary leading-[1.7] font-sans">
                {service.description}
              </p>
              <div className="mt-6 flex items-center gap-1 text-k-primary text-[13px] font-medium font-sans group cursor-pointer">
                <span className="relative">
                  Saber más
                  <span className="absolute bottom-0 left-0 w-full h-px bg-k-primary origin-left scale-x-100 group-hover:scale-x-100 transition-transform duration-300" />
                </span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
