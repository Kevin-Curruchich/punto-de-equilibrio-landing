import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export default function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return lenisRef;
}
