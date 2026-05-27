import { useEffect, useRef, type ComponentType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Navigation, Clock3 } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

gsap.registerPlugin(ScrollTrigger);

const MapContainerAny = MapContainer as unknown as ComponentType<any>;
const TileLayerAny = TileLayer as unknown as ComponentType<any>;
const CircleMarkerAny = CircleMarker as unknown as ComponentType<any>;

const clinicPosition: [number, number] = [19.3618, -99.1677];
const googleMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Av.+Insurgentes+Sur+1234,+Ciudad+de+M%C3%A9xico";
const wazeUrl = "https://waze.com/ul?ll=19.3618,-99.1677&navigate=yes";

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        },
      );

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
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
      id="ubicacion"
      ref={sectionRef}
      className="bg-cream py-24 md:py-32 lg:py-[120px]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={headingRef} className="text-center opacity-0">
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.1] tracking-tight text-k-text">
            Nuestra <span className="font-serif italic">ubicación</span>
          </h2>
          <p className="mt-4 text-base text-k-text-secondary font-sans max-w-[620px] mx-auto">
            Estamos en una zona céntrica y de fácil acceso para que llegues a tu
            sesión sin complicaciones.
          </p>
        </div>

        <div
          ref={contentRef}
          className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10"
        >
          <div className="lg:col-span-3 rounded-xl border border-k-line overflow-hidden shadow-card opacity-0">
            <MapContainerAny
              center={clinicPosition}
              zoom={14}
              scrollWheelZoom={false}
              className="h-[360px] md:h-[460px] w-full"
            >
              <TileLayerAny
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <CircleMarkerAny
                center={clinicPosition}
                radius={11}
                pathOptions={{
                  color: "#2F627F",
                  weight: 2,
                  fillColor: "#35769B",
                  fillOpacity: 0.95,
                }}
              >
                <Popup>Punto de Equilibrio Fisioterapia</Popup>
              </CircleMarkerAny>
            </MapContainerAny>
          </div>

          <aside className="lg:col-span-2 rounded-xl border border-k-line bg-white p-7 md:p-8 shadow-card opacity-0">
            <h3 className="text-2xl font-normal text-k-text">
              Clínica{" "}
              <span className="font-serif italic">Punto de Equilibrio</span>
            </h3>

            <ul className="mt-7 space-y-6">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-k-primary mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-[0.09em] text-k-text-muted font-medium">
                    Dirección
                  </p>
                  <p className="mt-1 text-sm text-k-text-secondary leading-[1.7]">
                    Av. Insurgentes Sur 1234, Ciudad de México
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Clock3 className="w-5 h-5 text-k-primary mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-[0.09em] text-k-text-muted font-medium">
                    Horario
                  </p>
                  <p className="mt-1 text-sm text-k-text-secondary leading-[1.7]">
                    Lun-Vie: 8:00 - 20:00
                    <br />
                    Sáb: 9:00 - 14:00
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-k-primary text-white px-5 py-3 text-sm font-medium tracking-wide hover:bg-k-green-dark transition-colors duration-300"
              >
                <Navigation className="w-4 h-4" />
                Google Maps
              </a>

              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-k-line bg-transparent text-k-text px-5 py-3 text-sm font-medium tracking-wide hover:bg-k-line transition-colors duration-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.4 0 0 5.1 0 11.4c0 3.8 1.9 7.3 5 9.5v3.1l3-1.5c1.3.4 2.6.6 4 .6 6.6 0 12-5.1 12-11.4S18.6 0 12 0Zm1.2 15.4c-.4 0-.8-.3-.8-.8s.3-.8.8-.8.8.3.8.8-.4.8-.8.8Zm-2.4 0c-.4 0-.8-.3-.8-.8s.3-.8.8-.8.8.3.8.8-.4.8-.8.8Zm-2.5-5.2c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.5 1.2 1.2-.5 1.2-1.2 1.2Zm7.4 0c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.5 1.2 1.2-.5 1.2-1.2 1.2Z" />
                </svg>
                Waze
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
