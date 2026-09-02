import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const format = (value: number, decimals: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

interface AnimatedNumberProps {
  /** The target numeric value to count up to. */
  value: number;
  /** Total duration of the count-up, in seconds (default 1.2). */
  duration?: number;
  /** Delay before the count-up begins, in seconds (default 0). */
  delay?: number;
  /** Text rendered before the number, e.g. "$". */
  prefix?: string;
  /** Text rendered after the number, e.g. "+" or "%". */
  suffix?: string;
  /** Number of decimal places to display (default 0). */
  decimals?: number;
  /** Optional classes applied to the value text. */
  className?: string;
}

const AnimatedNumber = ({
  value,
  duration = 1.2,
  delay = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: AnimatedNumberProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(format(0, decimals));

  useEffect(() => {
    if (!inView) return;

    // Respect reduced motion: show the final value immediately.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setDisplay(format(value, decimals));
      return;
    }

    const controls = animate(0, value, {
      duration,
      delay,
      ease: EASE_OUT_EXPO,
      onUpdate: (latest) => setDisplay(format(latest, decimals)),
    });

    return () => controls.stop();
  }, [inView, value, duration, delay, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

export default AnimatedNumber;
