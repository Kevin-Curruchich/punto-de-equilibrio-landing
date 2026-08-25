import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getLenis } from "@/hooks/useLenis";
import GoogleCalendarBookingDialog from "@/components/GoogleCalendarBookingDialog";
import { ChevronDown, HeartHandshake, House, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const floatingCardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const backgroundBlobsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const chipClass =
    "inline-flex items-center gap-2 rounded-full border border-k-line bg-white/70 px-4 py-2 text-sm font-medium text-k-text shadow-sm backdrop-blur-sm";

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      [titleLine1Ref.current, titleLine2Ref.current],
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.16, ease: "power4.out" },
    )
      .fromTo(
        subtitleRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power2.out" },
        "-=0.5",
      )
      .fromTo(
        ctaRef.current,
        { y: 24, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)" },
        "-=0.2",
      )
      .fromTo(
        badgeRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.1",
      )
      .fromTo(
        chevronRef.current,
        { opacity: 0 },
        { opacity: 0.7, duration: 0.5, ease: "power2.out" },
        "-=0.1",
      );

    gsap.to(floatingCardsRef.current, {
      y: (index) => (index % 2 === 0 ? -12 : 12),
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.25,
    });

    gsap.to(backgroundBlobsRef.current, {
      x: (_, target) =>
        (target as HTMLDivElement).dataset.shift === "left" ? -20 : 20,
      y: (_, target) =>
        (target as HTMLDivElement).dataset.shift === "left" ? -18 : 18,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.8,
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(floatingCardsRef.current);
      gsap.killTweensOf(backgroundBlobsRef.current);
    };
  }, []);

  const scrollToStats = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo("#stats");
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
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
          ref={(el) => {
            backgroundBlobsRef.current[0] = el;
          }}
          data-shift="left"
          className="absolute -left-10 top-14 h-[22rem] w-[22rem] rounded-full bg-[#dfeef3]/80 blur-3xl opacity-90"
        />
        <div
          ref={(el) => {
            backgroundBlobsRef.current[1] = el;
          }}
          data-shift="right"
          className="absolute -right-8 top-10 h-[24rem] w-[24rem] rounded-full bg-[#cfe1e7]/80 blur-3xl opacity-80"
        />
        <div
          ref={(el) => {
            backgroundBlobsRef.current[2] = el;
          }}
          data-shift="left"
          className="absolute bottom-[-3rem] left-[18%] h-[18rem] w-[18rem] rounded-full bg-[#f3e7dc]/90 blur-3xl opacity-70"
        />
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

        <svg
          className="absolute inset-0 h-full w-full opacity-60"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path
            d="M-80 650C80 640 130 540 260 530C380 520 440 645 560 650C680 655 730 575 830 560C930 545 1010 590 1105 620C1205 652 1345 615 1500 540"
            fill="none"
            stroke="rgba(81, 126, 150, 0.22)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M-70 710C110 700 170 600 285 610C430 622 500 745 620 745C790 745 860 625 980 620C1095 615 1210 705 1500 650"
            fill="none"
            stroke="rgba(120, 170, 180, 0.18)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M150 200C260 140 315 90 445 120C580 152 610 255 740 270C865 285 910 150 1035 135C1188 118 1305 195 1465 260"
            fill="none"
            stroke="rgba(92, 131, 153, 0.16)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M20 280C160 240 210 320 330 340C475 364 510 235 645 230C770 225 830 335 965 360C1088 383 1175 292 1315 280C1375 276 1418 282 1480 295"
            fill="none"
            stroke="rgba(146, 188, 202, 0.15)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(245,244,241,0.88) 0%, rgba(245,244,241,0.52) 100%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-6xl items-center justify-center px-6">
        <div className="flex max-w-3xl flex-col items-center text-center">
          <div ref={badgeRef} className={`${chipClass} mb-6 opacity-0`}>
            <HeartHandshake className="h-4 w-4 text-k-primary" />
            Fisioterapia
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-normal leading-[1.02] tracking-tight text-k-text">
            <div ref={titleLine1Ref} className="opacity-0">
              Recupera tu
            </div>
            <div ref={titleLine2Ref} className="opacity-0">
              <span className="font-serif italic text-k-primary">
                movilidad
              </span>{" "}
              en casa.
            </div>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-6 max-w-[540px] text-base leading-[1.7] text-k-text-secondary opacity-0"
          >
            Tratamiento físico personalizado, profesional y cercano, para volver
            a moverte con más fuerza, menos dolor y más confianza.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button
              size="lg"
              ref={ctaRef}
              onClick={() => setIsBookingOpen(true)}
              className="bg-k-primary text-white px-10 py-4 text-sm font-medium hover:bg-k-green-dark hover:scale-[1.03] hover:shadow-cta transition-all duration-300 opacity-0"
            >
              Agenda tu cita hoy
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          ref={(el) => {
            floatingCardsRef.current[0] = el;
          }}
          className={`${chipClass} absolute left-[8%] top-[20%] hidden md:flex`}
        >
          <House className="h-4 w-4 text-k-primary" />
          <span>Atención en casa</span>
        </div>

        <div
          ref={(el) => {
            floatingCardsRef.current[1] = el;
          }}
          className={`${chipClass} absolute right-[10%] top-[26%] hidden md:flex`}
        >
          <Sparkles className="h-4 w-4 text-k-primary" />
          <span>Plan guiado</span>
        </div>
      </div>

      <div
        ref={chevronRef}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 cursor-pointer opacity-0"
        onClick={scrollToStats}
      >
        <ChevronDown className="h-6 w-6 text-k-text-muted animate-bounce-down" />
      </div>

      <GoogleCalendarBookingDialog
        open={isBookingOpen}
        onOpenChange={setIsBookingOpen}
      />
    </section>
  );
}
