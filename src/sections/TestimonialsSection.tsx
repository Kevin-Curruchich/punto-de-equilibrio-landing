import { useState, type CSSProperties } from "react";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import SplitText from "@/components/motion/SplitText";
import { prefersReducedMotion, useInViewAnimations } from "@/hooks/useMotion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
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

const AUTOPLAY_MS = 7000;

export default function TestimonialsSection() {
  const sectionRef = useInViewAnimations<HTMLElement>();
  const headingRef = useRevealOnScroll<HTMLHeadingElement>();
  const contentRef = useRevealOnScroll<HTMLDivElement>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(() => !prefersReducedMotion());

  const goTo = (index: number, nextDirection?: "next" | "prev") => {
    setDirection(nextDirection ?? (index > activeIndex ? "next" : "prev"));
    setActiveIndex(index);
  };

  const goNext = () => goTo((activeIndex + 1) % testimonials.length, "next");

  const goPrev = () =>
    goTo((activeIndex - 1 + testimonials.length) % testimonials.length, "prev");

  const current = testimonials[activeIndex];
  const isRunning = isPlaying && !isHovered;

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
          className="text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.1] tracking-tight text-k-text text-center"
        >
          <SplitText text="Lo que dicen" />{" "}
          <SplitText
            text="nuestros pacientes"
            startIndex={3}
            className="font-serif italic"
          />
        </h2>

        {/* Testimonial Carousel */}
        <div
          ref={contentRef}
          data-reveal="blur"
          className="reveal-on-scroll mt-16 md:mt-20 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows - Desktop only */}
          <Button
            variant="ghost"
            onClick={goPrev}
            className="group absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-4 -translate-y-1/2 border border-k-line p-0 text-k-text-muted transition-all duration-300 hover:bg-k-primary hover:text-white lg:-translate-x-16 md:flex"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </Button>

          <Button
            variant="ghost"
            onClick={goNext}
            className="group absolute right-0 top-1/2 z-10 hidden h-11 w-11 translate-x-4 -translate-y-1/2 border border-k-line p-0 text-k-text-muted transition-all duration-300 hover:bg-k-primary hover:text-white lg:translate-x-16 md:flex"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Button>

          {/* Testimonial Content */}
          <div
            className="max-w-[700px] mx-auto text-center"
            aria-live={isPlaying ? "off" : "polite"}
          >
            <p className="sr-only">
              Testimonio {activeIndex + 1} de {testimonials.length}
            </p>
            <div
              key={activeIndex}
              data-direction={direction}
              className="testimonial-swap"
            >
              {/* Quote Mark */}
              <span className="quote-mark text-7xl md:text-[80px] font-serif text-k-secondary/55 leading-[0.5] block mb-4">
                &ldquo;
              </span>

              {/* Quote Text */}
              <blockquote className="font-serif text-xl md:text-[22px] text-k-text leading-[1.6] italic">
                {current.text}
              </blockquote>

              {/* Avatar */}
              <div className="testimonial-avatar mt-6 flex justify-center">
                {current.avatar ? (
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white ring-offset-2 ring-offset-k-green-light/40"
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

          {/* Progress indicators + pause */}
          <div
            className={`flex items-center justify-center gap-2 mt-12 ${
              isRunning ? "" : "is-paused"
            }`}
          >
            {testimonials.map((testimonial, i) => (
              <Button
                variant="ghost"
                key={testimonial.name}
                onClick={() => goTo(i)}
                className={`relative h-2 min-h-0 min-w-0 overflow-hidden rounded-full p-0 transition-all duration-500 ${
                  i === activeIndex
                    ? "w-10 bg-k-line hover:bg-k-line"
                    : "w-2 bg-k-line hover:bg-k-primary/35"
                }`}
                aria-label={`Testimonio ${i + 1}`}
                aria-current={i === activeIndex ? "true" : undefined}
              >
                {i === activeIndex &&
                  (isPlaying ? (
                    <span
                      key={activeIndex}
                      className="autoplay-bar absolute inset-0 rounded-full bg-k-primary"
                      style={
                        {
                          "--autoplay-duration": `${AUTOPLAY_MS}ms`,
                        } as CSSProperties
                      }
                      onAnimationEnd={goNext}
                    />
                  ) : (
                    <span className="absolute inset-0 rounded-full bg-k-primary" />
                  ))}
              </Button>
            ))}
            <Button
              variant="ghost"
              onClick={() => setIsPlaying((playing) => !playing)}
              className="ml-3 h-11 w-11 p-0 text-k-text-muted hover:bg-k-primary/5"
              aria-label={
                isPlaying
                  ? "Pausar testimonios automáticos"
                  : "Reproducir testimonios automáticos"
              }
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
