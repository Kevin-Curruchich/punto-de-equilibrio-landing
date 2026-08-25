import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Lesiones musculares",
    description:
      "Tratamiento personalizado para recuperar fuerza, movilidad y función.",
  },
  {
    number: "02",
    title: "Terapia neurológica",
    description:
      "Acompañamiento especializado para mejorar el movimiento y la autonomía.",
  },
  {
    number: "03",
    title: "Fisioterapia geriátrica",
    description:
      "Atención enfocada en mantener la independencia y una mejor calidad de vida.",
  },
  {
    number: "04",
    title: "Fisioterapia pediátrica",
    description:
      "Tratamientos adaptados al desarrollo y las necesidades de cada niño.",
  },
  {
    number: "05",
    title: "Dolor y rehabilitación musculoesquelética",
    description:
      "Recuperación progresiva para aliviar el dolor y volver a tus actividades.",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isCarouselPausedRef = useRef(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    const autoplay = window.setInterval(() => {
      if (isCarouselPausedRef.current) return;
      carouselApi.scrollNext();
    }, 4500);

    return () => window.clearInterval(autoplay);
  }, [carouselApi]);

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
            Fisioterapia especializada en la comodidad de tu hogar
          </p>
        </div>

        {/* Services Carousel */}
        <Carousel
          opts={{ align: "start", loop: true }}
          setApi={setCarouselApi}
          className="mt-16 md:mt-20"
          onMouseEnter={() => {
            isCarouselPausedRef.current = true;
          }}
          onMouseLeave={() => {
            isCarouselPausedRef.current = false;
          }}
          onFocus={() => {
            isCarouselPausedRef.current = true;
          }}
          onBlur={() => {
            isCarouselPausedRef.current = false;
          }}
        >
          <CarouselContent className="-ml-4">
            {services.map((service) => (
              <CarouselItem
                key={service.number}
                className="basis-full sm:basis-1/2 lg:basis-1/3 pl-4"
              >
                <div className="h-full bg-cream border border-k-line rounded-lg p-8 md:p-10 hover:shadow-card transition-shadow duration-400 group">
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
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
