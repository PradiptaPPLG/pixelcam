"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

/** Counts up (or down) to `value` on change. */
export default function AnimatedNumber({
  value,
  duration = 0.8,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);
  const from = useRef(0);

  useEffect(() => {
    const controls = animate(from.current, value, {
      duration,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    from.current = value;
    return () => controls.stop();
  }, [value, duration]);

  return <>{display}</>;
}
