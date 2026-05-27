import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "¿Cuánto dura una sesión de fisioterapia?",
    answer:
      "Las sesiones individuales tienen una duración de 45 a 60 minutos. Durante este tiempo realizamos una evaluación constante de tu progreso y ajustamos el tratamiento según tus necesidades.",
  },
  {
    question: "¿Necesito cita previa o aceptan pacientes sin cita?",
    answer:
      "Trabajamos exclusivamente con cita previa para garantizar que cada paciente reciba la atención personalizada y el tiempo que merece. Puedes agendar tu cita fácilmente a través de nuestro sitio web o llamando a la clínica.",
  },
  {
    question: "¿Qué debo llevar a mi primera consulta?",
    answer:
      "Te recomendamos traer estudios previos relevantes (rayos X, resonancias, informes médicos), ropa cómoda que permita el movimiento, y una lista de medicamentos que estés tomando actualmente. Si tienes seguro médico, también tu carnet.",
  },
  {
    question: "¿Cuántas sesiones necesitaré para recuperarme?",
    answer:
      "El número de sesiones varía según la condición, su severidad y tu respuesta al tratamiento. Después de la evaluación inicial, te proporcionaremos un plan de tratamiento con un estimado. En promedio, los pacientes notan mejoría significativa entre 4 y 8 sesiones.",
  },
  {
    question: "¿Ofrecen servicio a domicilio?",
    answer:
      "Sí, contamos con servicio de fisioterapia a domicilio para pacientes con movilidad reducida o que prefieren ser atendidos en la comodidad de su hogar. Consulta disponibilidad según tu zona.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!answerRef.current || !contentRef.current) return;

    if (isOpen) {
      const height = contentRef.current.scrollHeight;
      gsap.to(answerRef.current, {
        maxHeight: height,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(answerRef.current, {
        maxHeight: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-k-line">
      <Button
        variant="ghost"
        onClick={onToggle}
        className="group h-auto w-full justify-between rounded-full px-0 py-6 text-left whitespace-normal hover:bg-transparent hover:text-inherit"
      >
        <span className="text-base font-medium text-k-text font-sans pr-8">
          {question}
        </span>
        <span
          className={`text-k-primary text-xl font-light flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </Button>
      <div
        ref={answerRef}
        className="overflow-hidden"
        style={{ maxHeight: 0, opacity: 0 }}
      >
        <div ref={contentRef} className="pb-6">
          <p className="text-[15px] text-k-text-secondary leading-[1.7] font-sans">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        },
      );

      if (listRef.current) {
        const items = listRef.current.children;
        gsap.fromTo(
          items,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="bg-white py-24 md:py-32 lg:py-[120px]"
    >
      <div className="max-w-[800px] mx-auto px-6">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.1] tracking-tight text-k-text text-center opacity-0"
        >
          Preguntas <span className="font-serif italic">frecuentes</span>
        </h2>

        {/* FAQ List */}
        <div ref={listRef} className="mt-16 md:mt-20 max-w-[720px] mx-auto">
          {faqs.map((faq, i) => (
            <div key={i} className="opacity-0">
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
