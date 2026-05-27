const sections = [
  {
    title: "1. Aceptación de los términos",
    body: "Al crear una cuenta o utilizar la aplicación, aceptas estos Términos y Condiciones. Si no estás de acuerdo con alguno de ellos, debes dejar de usar la aplicación.",
  },
  {
    title: "2. Descripción del servicio",
    body: "La aplicación permite a fisioterapeutas y profesionales afines administrar expedientes de pacientes, registrar citas, documentar procedimientos realizados y dar seguimiento clínico dentro de su práctica profesional.",
  },
  {
    title: "3. Uso profesional y responsabilidades",
    body: "Cada fisioterapeuta es responsable del uso de la información clínica que capture, de la veracidad de los datos y del cumplimiento de la normativa aplicable en su jurisdicción. La aplicación no sustituye el juicio clínico ni constituye asesoría médica o legal.",
  },
  {
    title: "4. Cuenta y seguridad",
    body: "Eres responsable de mantener la confidencialidad de tus credenciales de acceso y de todas las actividades realizadas desde tu cuenta. Debes notificar de inmediato cualquier acceso no autorizado.",
  },
  {
    title: "5. Datos de pacientes y privacidad",
    body: "El tratamiento de datos personales y datos de salud se realiza conforme a nuestro Aviso de Privacidad y la legislación aplicable. Debes contar con la base legal o consentimiento necesario para registrar información de tus pacientes en la plataforma.",
  },
  {
    title: "6. Conducta prohibida",
    body: "No está permitido usar la aplicación para actividades ilícitas, infringir derechos de terceros, intentar vulnerar la seguridad del sistema, extraer datos sin autorización o subir contenido malicioso.",
  },
  {
    title: "7. Disponibilidad del servicio",
    body: "Buscamos mantener la continuidad del servicio, pero no garantizamos disponibilidad ininterrumpida. Podemos realizar mantenimientos, actualizaciones o cambios funcionales para mejorar la plataforma.",
  },
  {
    title: "8. Propiedad intelectual",
    body: "La plataforma, su diseño, código, marcas y contenidos son propiedad de sus titulares y están protegidos por la legislación aplicable. No se autoriza su reproducción o explotación sin permiso previo.",
  },
  {
    title: "9. Limitación de responsabilidad",
    body: "En la medida permitida por la ley, no seremos responsables por daños indirectos, pérdida de datos, lucro cesante o interrupciones derivadas del uso o imposibilidad de uso de la aplicación.",
  },
  {
    title: "10. Modificaciones",
    body: "Podemos actualizar estos términos en cualquier momento. Publicaremos la versión vigente en esta página e indicaremos la fecha de última actualización.",
  },
  {
    title: "11. Contacto",
    body: "Si tienes dudas sobre estos términos, escríbenos a hola@puntodeequilibrio.mx.",
  },
];

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-cream text-k-text">
      <main className="max-w-4xl mx-auto px-6 py-14 md:py-20">
        <a
          href="/"
          className="inline-flex items-center text-sm font-medium text-k-primary hover:text-k-green-dark transition-colors"
        >
          ← Volver al inicio
        </a>

        <header className="mt-7 md:mt-10 border-b border-border pb-7">
          <p className="text-xs uppercase tracking-[0.1em] text-k-text-muted">
            Documento legal
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-normal leading-tight">
            Términos y Condiciones
          </h1>
          <p className="mt-4 text-sm md:text-base text-k-text-secondary leading-relaxed max-w-3xl">
            Estos términos regulan el uso de la aplicación para fisioterapeutas
            y profesionales de la salud que gestionan pacientes, citas y
            procedimientos.
          </p>
          <p className="mt-4 text-xs text-k-text-muted">
            Última actualización: 26 de mayo de 2026
          </p>
        </header>

        <section className="mt-8 md:mt-10 space-y-7">
          {sections.map((section) => (
            <article key={section.title} className="space-y-2">
              <h2 className="text-lg md:text-xl font-medium text-k-text">
                {section.title}
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-k-text-secondary">
                {section.body}
              </p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
