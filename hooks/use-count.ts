import { useEffect, useState } from "react";
import { animate, cubicBezier } from "framer-motion";

export function useCountUp(start: number, end: number, trigger: boolean, duration = 3) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!trigger) return setValue(start);

    const controls = animate(start, end, {
      duration,
      ease: cubicBezier(0.17, 0.55, 0.55, 1),
      onUpdate(latest) {
        setValue(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [trigger, start, end, duration]);

  return value;
}
