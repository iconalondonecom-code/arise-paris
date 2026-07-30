import { useCallback, useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export function useCarousel(length: number, autoMs = 5500) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  const go = useCallback(
    (n: number) => setIndex(((n % length) + length) % length),
    [length],
  );
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  const select = useCallback(
    (n: number) => {
      setPaused(true);
      go(n);
    },
    [go],
  );

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % length), autoMs);
    return () => window.clearInterval(id);
  }, [paused, reduced, length, autoMs]);

  // touch swipe
  const touchX = useRef<number | null>(null);
  const swipeHandlers = {
    onTouchStart: (e: React.TouchEvent) => {
      touchX.current = e.touches[0].clientX;
      setPaused(true);
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (touchX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
      touchX.current = null;
    },
  };

  const keyHandlers = {
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        select(index + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        select(index - 1);
      }
    },
    onFocus: () => setPaused(true),
  };

  const hoverHandlers = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
  };

  return { index, setIndex: select, next, prev, swipeHandlers, keyHandlers, hoverHandlers, reduced };
}