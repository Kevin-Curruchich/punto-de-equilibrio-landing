import useLenis from "@/hooks/useLenis";
import Navigation from "@/sections/Navigation";
import HeroSection from "@/sections/HeroSection";
import StatsSection from "@/sections/StatsSection";
import ServicesSection from "@/sections/ServicesSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import FAQSection from "@/sections/FAQSection";
import LocationSection from "@/sections/LocationSection";
import CTAFooter from "@/sections/CTAFooter";
import TermsAndConditionsPage from "@/pages/TermsAndConditionsPage";
import DeleteAccountPage from "@/pages/DeleteAccountPage";

// Calendly type declaration
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export default function App() {
  const pathname = window.location.pathname.toLowerCase();

  if (pathname === "/terminos-y-condiciones") {
    return <TermsAndConditionsPage />;
  }

  if (pathname === "/eliminar-cuenta") {
    return <DeleteAccountPage />;
  }

  useLenis();

  return (
    <div className="relative">
      <Navigation />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <TestimonialsSection />
        <FAQSection />
        <LocationSection />
        <CTAFooter />
      </main>

      {/* Calendly Widget Script */}
      <script
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      />
    </div>
  );
}
