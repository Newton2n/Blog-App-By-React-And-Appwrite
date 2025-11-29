import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

export function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      duration: 1.4,
      smoothWheel: true,
      smoothTouch: false,
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 0.9,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
