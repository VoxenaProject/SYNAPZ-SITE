"use client";

import { useRef, useState, useEffect } from "react";

interface MetricCounterProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function MetricCounter({
  end,
  suffix = "",
  label,
  duration = 2000,
}: MetricCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out quad: t * (2 - t)
            const eased = progress * (2 - progress);
            const currentValue = Math.round(eased * end);

            setCount(currentValue);

            if (progress < 1) {
              frameRef.current = requestAnimationFrame(animate);
            }
          };

          frameRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration]);

  return (
    <div ref={ref} className="text-center">
      <span className="text-4xl md:text-5xl font-extrabold gradient-text">
        {count}
        {suffix}
      </span>
      <p className="text-sm text-[#94a3b8] mt-2">{label}</p>
    </div>
  );
}
