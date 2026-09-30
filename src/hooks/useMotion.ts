import { useEffect, useRef } from "react";

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function hasFinePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

/**
 * Writes the pointer position relative to the element as --mx / --my
 * (range -1..1) so CSS layers can drift with it. Desktop only.
 */
export function usePointerParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion() || !hasFinePointer()) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      element.style.setProperty("--mx", currentX.toFixed(4));
      element.style.setProperty("--my", currentY.toFixed(4));

      if (
        Math.abs(targetX - currentX) > 0.001 ||
        Math.abs(targetY - currentY) > 0.001
      ) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const handleMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    element.addEventListener("pointermove", handleMove, { passive: true });
    element.addEventListener("pointerleave", handleLeave);

    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return ref;
}

/**
 * Writes how far the element has been scrolled past (0..1) as a CSS
 * variable on the element. Used for scroll-linked hero effects.
 */
export function useScrollProgress<T extends HTMLElement>(
  cssVar = "--scroll-progress",
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      element.style.setProperty(cssVar, progress.toFixed(4));
    };

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [cssVar]);

  return ref;
}

/**
 * Scales the element horizontally with the whole-page scroll progress.
 * Writes the transform directly so the page never re-renders on scroll.
 */
export function usePageProgressBar<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      const progress = Math.min(Math.max(window.scrollY / max, 0), 1);
      element.style.transform = `scaleX(${progress.toFixed(4)})`;
    };

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return ref;
}

/**
 * Card tilt + spotlight that follows the pointer. Writes --rx / --ry
 * (degrees) and --spot-x / --spot-y (px) on the element.
 */
export function useTilt<T extends HTMLElement>(maxTilt = 6) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion() || !hasFinePointer()) return;

    let frame = 0;

    const handleMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const px = x / rect.width - 0.5;
        const py = y / rect.height - 0.5;
        element.style.setProperty("--rx", `${(-py * maxTilt).toFixed(2)}deg`);
        element.style.setProperty("--ry", `${(px * maxTilt).toFixed(2)}deg`);
        element.style.setProperty("--spot-x", `${x.toFixed(0)}px`);
        element.style.setProperty("--spot-y", `${y.toFixed(0)}px`);
      });
    };

    const handleLeave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      element.style.setProperty("--rx", "0deg");
      element.style.setProperty("--ry", "0deg");
    };

    element.addEventListener("pointermove", handleMove, { passive: true });
    element.addEventListener("pointerleave", handleLeave);

    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerleave", handleLeave);
    };
  }, [maxTilt]);

  return ref;
}

/** Pulls the element slightly toward the pointer while hovered. */
export function useMagnetic<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion() || !hasFinePointer()) return;

    const handleMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * strength;
      const y = (event.clientY - rect.top - rect.height / 2) * strength;
      element.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    };

    const handleLeave = () => {
      element.style.transform = "";
    };

    element.addEventListener("pointermove", handleMove, { passive: true });
    element.addEventListener("pointerleave", handleLeave);

    return () => {
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerleave", handleLeave);
    };
  }, [strength]);

  return ref;
}
