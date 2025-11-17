// hooks/use-count.ts
import { useEffect, useState } from "react";
import { animate, easeOut } from "framer-motion";

export function useCountUp(
  start: number,
  end: number,
  trigger: boolean,
  duration = 1.2,
) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!trigger) {
      setValue(start);
      return;
    }

    const controls = animate(start, end, {
      duration,
      ease: easeOut,
      onUpdate(latest) {
        setValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [trigger, start, end, duration]);

  return value;
}
