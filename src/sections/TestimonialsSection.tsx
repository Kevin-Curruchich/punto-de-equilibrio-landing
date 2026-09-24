import { useState } from "react";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    text: "Gracias a Punto de Equilibrio pude volver a correr después de una lesión de rodilla que me tenía sin entrenar por 6 meses. El trato es excepcional y los resultados increíbles.",
    name: "Carlos Mendoza",
    role: "Runner amateur · Lesión de LCA",
    avatar: "/images/testimonial-avatar-1.jpg",
    initials: "CM",
  },
  {
    text: "Llevaba años con dolor de espalda crónico. Después de solo dos meses de tratamiento, puedo decir que recuperé mi calidad de vida. Totalmente recomendado.",
    name: "Ana Herrera",
    role: "Oficinista · Dolor lumbar crónico",
    avatar: "/images/testimonial-avatar-2.jpg",
    initials: "AH",
  },
  {
    text: "Como jugador de fútbol, las lesiones son frecuentes. En Punto de Equilibrio no solo me recuperan rápido, sino que me enseñan a prevenirlas. Son parte de mi equipo.",
    name: "Diego Sánchez",
    role: "Jugador semi-profesional · Esguince de tobillo recurrente",
    avatar: "/images/testimonial-avatar-3.jpg",
    initials: "DS",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRevealOnScroll<HTMLElement>();
  const headingRef = useRevealOnScroll<HTMLHeadingElement>();
  const contentRef = useRevealOnScroll<HTMLDivElement>();
  const [activeIndex, setActiveIndex] = useState(0);
  const goTo = (index: number) => setActiveIndex(index);

  const goNext = () => goTo((activeIndex + 1) % testimonials.length);

  const goPrev = () =>
    goTo((activeIndex - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[activeIndex];

  return (
    <section
      id="testimonios"
      ref={sectionRef}
      className="bg-cream py-24 md:py-32 lg:py-[120px]"
    >
      <div className="max-w-[1000px] mx-auto px-6">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="reveal-on-scroll text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.1] tracking-tight text-k-text text-center"
        >
          Lo que dicen{" "}
          <span className="font-serif italic">nuestros pacientes</span>
        </h2>

        {/* Testimonial Carousel */}
        <div
          ref={contentRef}
          className="reveal-on-scroll mt-16 md:mt-20 relative"
        >
          {/* Navigation Arrows - Desktop only */}
          <Button
            variant="ghost"
            onClick={goPrev}
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-4 -translate-y-1/2 border border-k-line p-0 text-k-text-muted transition-all duration-300 hover:bg-k-primary/5 lg:-translate-x-16 md:flex"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            onClick={goNext}
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 translate-x-4 -translate-y-1/2 border border-k-line p-0 text-k-text-muted transition-all duration-300 hover:bg-k-primary/5 lg:translate-x-16 md:flex"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Testimonial Content */}
          <div className="max-w-[700px] mx-auto text-center">
            <div key={activeIndex} className="testimonial-swap">
              {/* Quote Mark */}
              <span className="text-7xl md:text-[80px] font-serif text-k-secondary/55 leading-[0.5] block mb-4">
                &ldquo;
              </span>

              {/* Quote Text */}
              <blockquote className="font-serif text-xl md:text-[22px] text-k-text leading-[1.6] italic">
                {current.text}
              </blockquote>

              {/* Avatar */}
              <div className="mt-6 flex justify-center">
                {current.avatar ? (
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-k-primary flex items-center justify-center text-white text-base font-medium">
                    {current.initials}
                  </div>
                )}
              </div>

              {/* Name */}
              <p className="mt-5 text-sm font-medium text-k-text font-sans">
                {current.name}
              </p>

              {/* Role */}
              <p className="mt-1 text-[13px] text-k-text-secondary font-sans">
                {current.role}
              </p>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, i) => (
              <Button
                variant="ghost"
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 w-2 min-h-0 min-w-0 rounded-full p-0 transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-k-primary scale-110 hover:bg-k-primary"
                    : "bg-k-line hover:bg-k-primary/35"
                }`}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
