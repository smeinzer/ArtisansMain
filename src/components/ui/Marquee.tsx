interface MarqueeProps {
  items: string[];
  separator?: string;
  speed?: number;
  className?: string;
  direction?: 'left' | 'right';
}

export default function Marquee({
  items,
  separator = '\u2014',
  speed = 30,
  className = '',
  direction = 'left',
}: MarqueeProps) {
  const content = items.map((item, i) => (
    <span key={i} className="inline-flex items-center">
      <span className="font-serif text-lg md:text-xl text-warm-gray tracking-wide">
        {item}
      </span>
      <span className="mx-4 md:mx-6 text-warm-gray-light text-sm" aria-hidden="true">
        {separator}
      </span>
    </span>
  ));

  const animationStyle = {
    animationDuration: `${speed}s`,
    animationDirection: direction === 'right' ? 'reverse' as const : 'normal' as const,
  };

  return (
    <section
      className={`bg-cream-dark py-6 md:py-8 overflow-hidden ${className}`}
      aria-label="Gallery categories"
    >
      <div
        className="inline-flex whitespace-nowrap will-change-transform hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {/* First copy */}
        <span className="inline-flex">{content}</span>
        {/* Duplicate for seamless loop */}
        <span className="inline-flex" aria-hidden="true">{content}</span>
      </div>
    </section>
  );
}
