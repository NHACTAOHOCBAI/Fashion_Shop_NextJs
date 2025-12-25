import { useEffect, useState } from "react";

/**
 * Custom hook for animated number counting from 0 to target value
 * Uses requestAnimationFrame for smooth animations with easeOutCubic easing
 *
 * @param target - The target number to count up to
 * @param duration - Animation duration in milliseconds (default: 2000ms)
 * @returns The current count value
 *
 * @example
 * const count = useCountUp(1250, 1500);
 * return <div>{count}</div>; // Animates from 0 to 1250 over 1.5s
 */
export function useCountUp(
  target: number,
  duration: number = 2000
): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function: easeOutCubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(startValue + (target - startValue) * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return count;
}
