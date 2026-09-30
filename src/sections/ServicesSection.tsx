import { useEffect, useState, type CSSProperties } from "react";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import SplitText from "@/components/motion/SplitText";
import { prefersReducedMotion, useTilt } from "@/hooks/useMotion";
import { ArrowRight } from "lucide-react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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

const AUTOPLAY_MS = 4500;
const DESKTOP_QUERY = "(min-width: 1024px)";

type Service = (typeof services)[number];

function ServiceCard({ service }: { service: Service }) {
  const tiltRef = useTilt<HTMLDivElement>(7);

  return (
    <div
      ref={tiltRef}
      className="tilt-card relative h-full overflow-hidden bg-cream border border-k-line rounded-lg p-8 md:p-10 hover:shadow-card hover:border-k-primary/30 group"
    >
      <span className="tilt-card-number block font-serif italic text-4xl text-k-text-muted">
        {service.number}
      </span>
      <h3 className="mt-5 text-lg font-medium text-k-text font-sans">
        {service.title}
      </h3>
      <p className="mt-3 text-sm text-k-text-secondary leading-[1.7] font-sans">
        {service.description}
      </p>
      <div className="mt-6 flex items-center gap-1 text-k-primary text-[13px] font-medium font-sans">
        <span className="relative">
          Saber más
          <span className="absolute bottom-0 left-0 w-full h-px bg-k-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </span>
        <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </div>
  );
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

/** Desktop: an endless, hover-pausable band of cards with no controls. */
function ServicesMarquee() {
  const revealRef = useRevealOnScroll<HTMLDivElement>();

  const renderGroup = (hidden: boolean) => (
    <ul
      className="flex shrink-0 gap-5 pr-5"
      aria-hidden={hidden || undefined}
    >
      {services.map((service) => (
        <li key={service.number} className="w-[360px] shrink-0">
          <ServiceCard service={service} />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      ref={revealRef}
      data-reveal="blur"
      className="reveal-on-scroll marquee services-marquee mt-16 md:mt-20 overflow-hidden py-3"
    >
      <div
        className="marquee-track"
        style={{ "--marquee-duration": "45s" } as CSSProperties}
      >
        {renderGroup(false)}
        {renderGroup(true)}
      </div>
    </div>
  );
}

/** Reduced motion on desktop: all services visible, nothing moves. */
function ServicesGrid() {
  const revealRef = useRevealOnScroll<HTMLUListElement>();

  return (
    <ul
      ref={revealRef}
      className="reveal-stagger mt-16 md:mt-20 grid grid-cols-3 gap-5"
    >
      {services.map((service, index) => (
        <li
          key={service.number}
          style={{ "--reveal-index": index } as CSSProperties}
        >
          <ServiceCard service={service} />
        </li>
      ))}
    </ul>
  );
}

/** Mobile/tablet: swipeable carousel with an autoplay progress bar. */
function ServicesCarousel() {
  const carouselRef = useRevealOnScroll<HTMLDivElement>();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [canAutoplay] = useState(() => !prefersReducedMotion());

  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () =>
      setSelectedIndex(carouselApi.selectedScrollSnap());
    handleSelect();
    carouselApi.on("select", handleSelect);
    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi]);

  // Advance when the progress bar animation finishes, so the bar and the
  // slide change always stay in sync (and pausing the bar pauses autoplay).
  const handleAutoplayEnd = () => {
    carouselApi?.scrollNext();
  };

  return (
    <div
      ref={carouselRef}
      className={isPaused ? "is-paused" : undefined}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setIsPaused(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setIsPaused(false);
      }}
      // Hold autoplay while a finger is dragging the carousel.
      onPointerDown={() => setIsPaused(true)}
      onPointerUp={() => setIsPaused(false)}
      onPointerCancel={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <Carousel
        opts={{ align: "start", loop: true }}
        setApi={setCarouselApi}
        className="mt-16 md:mt-20"
      >
        <CarouselContent className="reveal-stagger -ml-4 py-2">
          {services.map((service, index) => (
            <CarouselItem
              key={service.number}
              className="basis-full sm:basis-1/2 pl-4"
              style={{ "--reveal-index": index } as CSSProperties}
            >
              <ServiceCard service={service} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Position + autoplay progress */}
      <div className="mt-10 flex items-center justify-center gap-4 font-sans text-xs text-k-text-muted">
        <span className="tabular-nums text-k-text">
          {String(selectedIndex + 1).padStart(2, "0")}
        </span>
        <div className="relative h-px w-32 overflow-hidden bg-k-line md:w-48">
          {canAutoplay ? (
            <div
              key={selectedIndex}
              className="autoplay-bar absolute inset-0 bg-k-primary"
              style={
                { "--autoplay-duration": `${AUTOPLAY_MS}ms` } as CSSProperties
              }
              onAnimationEnd={handleAutoplayEnd}
            />
          ) : (
            <div
              className="absolute inset-y-0 left-0 bg-k-primary transition-[width] duration-500"
              style={{
                width: `${((selectedIndex + 1) / services.length) * 100}%`,
              }}
            />
          )}
        </div>
        <span className="tabular-nums">
          {String(services.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const headingRef = useRevealOnScroll<HTMLDivElement>();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const [reducedMotion] = useState(prefersReducedMotion);

  return (
    <section
      id="servicios"
      className="overflow-hidden bg-white py-24 md:py-32 lg:py-[120px]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.1] tracking-tight text-k-text">
            <SplitText text="Nuestros" />{" "}
            <SplitText
              text="servicios"
              startIndex={1}
              className="font-serif italic"
            />
          </h2>
          <p className="mt-4 text-base text-k-text-secondary font-sans">
            Fisioterapia especializada en la comodidad de tu hogar
          </p>
        </div>

        {!isDesktop && <ServicesCarousel />}
        {isDesktop && reducedMotion && <ServicesGrid />}
      </div>

      {isDesktop && !reducedMotion && <ServicesMarquee />}
    </section>
  );
}
