import Navigation from "@/sections/Navigation";
import HeroSection from "@/sections/HeroSection";
import StatsSection from "@/sections/StatsSection";
import ServicesSection from "@/sections/ServicesSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import FAQSection from "@/sections/FAQSection";

import CTAFooter from "@/sections/CTAFooter";
import TermsAndConditionsPage from "@/pages/TermsAndConditionsPage";
import DeleteAccountPage from "@/pages/DeleteAccountPage";

function updatePageMetadata(pathname: string) {
  const metadata = {
    "/terminos-y-condiciones": {
      title: "Términos y Condiciones | Punto de Equilibrio",
      description:
        "Consulta los términos y condiciones de uso de Punto de Equilibrio.",
    },
    "/eliminar-cuenta": {
      title: "Eliminar cuenta | Punto de Equilibrio",
      description:
        "Solicita la eliminación de tu cuenta y datos asociados de Punto de Equilibrio.",
    },
  }[pathname];

  if (!metadata) return;

  document.title = metadata.title;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", metadata.description);
  document
    .querySelector('link[rel="canonical"]')
    ?.setAttribute("href", `https://punto-de-equilibrio.com${pathname}`);
}

export default function App() {
  const pathname = window.location.pathname.toLowerCase();

  updatePageMetadata(pathname);

  if (pathname === "/terminos-y-condiciones") {
    return <TermsAndConditionsPage />;
  }

  if (pathname === "/eliminar-cuenta") {
    return <DeleteAccountPage />;
  }

  return (
    <div className="relative">
      <Navigation />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <TestimonialsSection />
        <FAQSection />

        <CTAFooter />
      </main>
    </div>
  );
}
