import { useEffect, useState, type CSSProperties } from "react";
import GoogleCalendarBookingDialog from "@/components/GoogleCalendarBookingDialog";
import SplitText from "@/components/motion/SplitText";
import { trackEvent } from "@/lib/firebase";
import {
  useMagnetic,
  usePointerParallax,
  useScrollProgress,
} from "@/hooks/useMotion";
import { Car, HeartHandshake, House, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const wavePaths = [
  {
    d: "M-80 650C80 640 130 540 260 530C380 520 440 645 560 650C680 655 730 575 830 560C930 545 1010 590 1105 620C1205 652 1345 615 1500 540",
    stroke: "rgba(81, 126, 150, 0.26)",
    width: 2,
  },
  {
    d: "M-70 710C110 700 170 600 285 610C430 622 500 745 620 745C790 745 860 625 980 620C1095 615 1210 705 1500 650",
    stroke: "rgba(120, 170, 180, 0.22)",
    width: 2.5,
  },
  {
    d: "M150 200C260 140 315 90 445 120C580 152 610 255 740 270C865 285 910 150 1035 135C1188 118 1305 195 1465 260",
    stroke: "rgba(92, 131, 153, 0.2)",
    width: 2,
  },
  {
    d: "M20 280C160 240 210 320 330 340C475 364 510 235 645 230C770 225 830 335 965 360C1088 383 1175 292 1315 280C1375 276 1418 282 1480 295",
    stroke: "rgba(146, 188, 202, 0.2)",
    width: 2,
  },
];

const floatingChips = [
  {
    icon: House,
    label: "Atención en casa",
    position: "left-[7%] top-[22%]",
    depth: "-28px",
    delay: "1100ms",
    float: "",
  },
  {
    icon: Sparkles,
    label: "Plan guiado",
    position: "right-[9%] top-[28%]",
    depth: "36px",
    delay: "1250ms",
    float: "hero-float-delay",
  },
  {
    icon: Car,
    label: "Sin traslados",
    position: "right-[16%] bottom-[20%]",
    depth: "-20px",
    delay: "1400ms",
    float: "",
  },
];

export default function HeroSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const sectionRef = useScrollProgress<HTMLElement>("--hero-progress");
  const stageRef = usePointerParallax<HTMLDivElement>();
  const ctaRef = useMagnetic<HTMLDivElement>(0.25);
  const chipClass =
    "inline-flex items-center gap-2 rounded-full border border-k-line bg-white/70 px-4 py-2 text-sm font-medium text-k-text shadow-sm backdrop-blur-sm";

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const scrollToStats = () => {
    document.querySelector("#stats")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden"
    >
      <div
        ref={stageRef}
        className="relative flex min-h-[100dvh] flex-col items-center justify-center"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #f3f1ee 0%, #eef3f4 45%, #f7f4f1 100%)",
          }}
        >
          <div
            className="parallax-layer absolute -left-10 top-14"
            style={
              { "--depth": "-40px", "--scroll-depth": "160px" } as CSSProperties
            }
          >
            <div className="hero-blob h-[22rem] w-[22rem] rounded-full bg-[#dfeef3]/80 blur-3xl opacity-90" />
          </div>
          <div
            className="parallax-layer absolute -right-8 top-10"
            style={
              { "--depth": "50px", "--scroll-depth": "240px" } as CSSProperties
            }
          >
            <div className="hero-blob hero-blob-delay-1 h-[24rem] w-[24rem] rounded-full bg-[#cfe1e7]/80 blur-3xl opacity-80" />
          </div>
          <div
            className="parallax-layer absolute bottom-[-3rem] left-[18%]"
            style={
              { "--depth": "-30px", "--scroll-depth": "80px" } as CSSProperties
            }
          >
            <div className="hero-blob hero-blob-delay-2 h-[18rem] w-[18rem] rounded-full bg-[#f3e7dc]/90 blur-3xl opacity-70" />
          </div>
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(rgba(122,139,148,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(122,139,148,0.12) 1px, transparent 1px)",
              backgroundSize: "120px 120px",
              maskImage:
                "radial-gradient(circle at center, black 35%, transparent 100%)",
            }}
          />

          <div
            className="parallax-layer absolute inset-0"
            style={
              { "--depth": "14px", "--scroll-depth": "-60px" } as CSSProperties
            }
          >
            <svg
              className="h-full w-full opacity-70"
              viewBox="0 0 1440 900"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              {wavePaths.map((path, index) => (
                <g key={path.d}>
                  <path
                    d={path.d}
                    pathLength={1}
                    fill="none"
                    stroke={path.stroke}
                    strokeWidth={path.width}
                    strokeLinecap="round"
                    className="draw-path"
                    style={
                      { "--draw-delay": `${index * 180}ms` } as CSSProperties
                    }
                  />
                  <path
                    d={path.d}
                    pathLength={1}
                    fill="none"
                    stroke="rgba(99, 178, 163, 0.55)"
                    strokeWidth={path.width + 1}
                    strokeLinecap="round"
                    className="flow-pulse"
                    style={
                      {
                        "--flow-delay": `${2400 + index * 1600}ms`,
                      } as CSSProperties
                    }
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(245,244,241,0.8) 0%, rgba(245,244,241,0.45) 100%)",
          }}
        />

        <div className="hero-content relative z-10 flex w-full max-w-6xl items-center justify-center px-6">
          <div className="flex max-w-3xl flex-col items-center text-center">
            <div className={`${chipClass} hero-chip-in mb-6`}>
              <HeartHandshake className="h-4 w-4 text-k-primary" />
              Fisioterapia
            </div>

            <h1
              data-revealed={isReady ? "" : undefined}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-normal leading-[1.02] tracking-tight text-k-text"
              style={{ "--split-delay": "150ms" } as CSSProperties}
            >
              <span className="block">
                <SplitText text="Recupera tu" />
              </span>
              <span className="block">
                <span className="relative inline-block">
                  <SplitText
                    text="movilidad"
                    startIndex={2}
                    className="font-serif italic text-k-primary"
                  />
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 300 24"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute -bottom-1 left-0 h-3 w-full md:h-4"
                  >
                    <path
                      d="M4 16C40 6 70 6 104 13C140 20 170 20 206 11C236 4 266 6 296 12"
                      pathLength={1}
                      fill="none"
                      stroke="#63B2A3"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="accent-underline"
                    />
                  </svg>
                </span>{" "}
                <SplitText text="en casa." startIndex={3} />
              </span>
            </h1>

            <p className="hero-reveal hero-reveal-delay-2 mt-6 max-w-[540px] text-base leading-[1.7] text-k-text-secondary">
              Tratamiento físico personalizado, profesional y cercano, para
              volver a moverte con más fuerza, menos dolor y más confianza.
            </p>

            <div className="hero-reveal hero-reveal-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <div ref={ctaRef} className="magnetic">
                <Button
                  size="lg"
                  onClick={() => {
                    void trackEvent("booking_open", { location: "hero" });
                    setIsBookingOpen(true);
                  }}
                  className="btn-shine bg-k-primary text-white px-10 py-4 text-sm font-medium hover:bg-k-green-dark hover:shadow-cta transition-all duration-300"
                >
                  Agenda tu cita hoy
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none">
          {floatingChips.map((chip) => (
            <div
              key={chip.label}
              className={`parallax-layer absolute hidden md:block ${chip.position}`}
              style={
                {
                  "--depth": chip.depth,
                  "--scroll-depth": "-140px",
                } as CSSProperties
              }
            >
              <div
                className="hero-chip-in"
                style={{ animationDelay: chip.delay }}
              >
                <div className={`${chipClass} hero-float ${chip.float}`}>
                  <chip.icon className="h-4 w-4 text-k-primary" />
                  <span>{chip.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <button
            type="button"
            onClick={scrollToStats}
            aria-label="Ir a la siguiente sección"
            className="hero-reveal hero-reveal-delay-3 flex flex-col items-center gap-2 text-k-text-muted transition-colors duration-300 hover:text-k-primary"
          >
            <span className="flex h-10 w-6 justify-center rounded-full border-2 border-k-text-muted/60 pt-2">
              <span className="scroll-cue-dot block h-2 w-1 rounded-full bg-k-primary" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em]">
              Descubre
            </span>
          </button>
        </div>
      </div>

      <GoogleCalendarBookingDialog
        open={isBookingOpen}
        onOpenChange={setIsBookingOpen}
      />
    </section>
  );
}
