'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 30, suffix: '+', label: 'Local Artists' },
  { value: 500, suffix: '+', label: 'Original Works' },
  { value: 7, suffix: '', label: 'Disciplines' },
  { value: 2023, suffix: '', label: 'Established' },
];

function AnimatedNumber({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const [display, setDisplay] = useState(0);
  const rafId = useRef(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = value > 100 ? 2000 : 1500;
    const startTime = performance.now();
    // For "Est. 2023" start from a nearby number
    const startValue = value > 2000 ? value - 30 : 0;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (value - startValue) * eased);
      setDisplay(current);

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    }

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [isVisible, value]);

  return (
    <span>
      {isVisible ? display.toLocaleString() : '0'}
      {suffix}
    </span>
  );
}

export default function ImpactStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease-out ${i * 150}ms, transform 0.6s ease-out ${i * 150}ms`,
              }}
            >
              <p className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-charcoal tracking-tight leading-none">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </p>
              <p className="mt-3 text-xs sm:text-sm font-sans font-medium tracking-[0.15em] uppercase text-warm-gray">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
