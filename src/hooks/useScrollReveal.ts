import { useEffect, useRef, useState, type RefObject } from "react";

export type ScrollRevealOptions = {
  /** If true, animate only once; if false, repeat when scrolling back into view (default false) */
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
};

/**
 * When the ref target enters the viewport, sets visible to true; when it leaves, sets visible to false (unless once).
 * Use for scroll-in animations on the landing page; repeat on scroll up/down when once is false.
 */
export function useScrollReveal(options: ScrollRevealOptions = {}): {
  ref: RefObject<HTMLDivElement | null>;
  visible: boolean;
} {
  const { once = false, rootMargin = "0px 0px -8% 0px", threshold = 0.08 } = options;
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          } else {
            if (!once) setVisible(false);
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, visible };
}
