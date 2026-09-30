import { useEffect, useRef } from "react";

export default function useRevealOnScroll<T extends HTMLElement>() {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        // An attribute (not a class) so React re-rendering className on the
        // same element never wipes the revealed state.
        element.setAttribute("data-revealed", "");
        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return elementRef;
}
