import { useState } from "react";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "¿Cuánto dura una sesión de fisioterapia?",
    answer:
      "Las sesiones individuales tienen una duración de 45 a 60 minutos. Durante este tiempo realizamos una evaluación constante de tu progreso y ajustamos el tratamiento según tus necesidades.",
  },
  {
    question: "¿Cómo agendo mi cita de fisioterapia a domicilio?",
    answer:
      "Trabajamos con cita previa para reservar el tiempo de atención y confirmar la disponibilidad en tu zona. Puedes agendarla desde el botón de reservas de nuestro sitio web.",
  },
  {
    question: "¿Qué debo preparar para mi primera consulta a domicilio?",
    answer:
      "Ten a la mano tus estudios previos relevantes, informes médicos y una lista de medicamentos. Usa ropa cómoda que permita el movimiento y prepara un espacio despejado donde podamos realizar la evaluación. Nosotros llevamos el material necesario para la sesión.",
  },
  {
    question: "¿Cuántas sesiones necesitaré para recuperarme?",
    answer:
      "El número de sesiones varía según la condición, su severidad y tu respuesta al tratamiento. Después de la evaluación inicial, te proporcionaremos un plan de tratamiento con un estimado. En promedio, los pacientes notan mejoría significativa entre 4 y 8 sesiones.",
  },
  {
    question: "¿Cómo funciona una sesión de fisioterapia a domicilio?",
    answer:
      "El fisioterapeuta se traslada a tu domicilio con el material necesario para realizar la evaluación y el tratamiento. La atención se adapta a tu condición, tus objetivos y el espacio disponible en casa.",
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
      <div className={`faq-answer ${isOpen ? "is-open" : ""}`}>
        <div className="pb-6">
          <p className="text-[15px] text-k-text-secondary leading-[1.7] font-sans">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const sectionRef = useRevealOnScroll<HTMLElement>();
  const headingRef = useRevealOnScroll<HTMLHeadingElement>();
  const listRef = useRevealOnScroll<HTMLDivElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
          className="reveal-on-scroll text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.1] tracking-tight text-k-text text-center"
        >
          Preguntas <span className="font-serif italic">frecuentes</span>
        </h2>

        {/* FAQ List */}
        <div
          ref={listRef}
          className="reveal-on-scroll mt-16 md:mt-20 max-w-[720px] mx-auto"
        >
          {faqs.map((faq, i) => (
            <div key={i}>
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
