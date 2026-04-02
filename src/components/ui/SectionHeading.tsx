import TextReveal from '@/components/ui/TextReveal';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <TextReveal
        text={title}
        as="h2"
        className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-charcoal dark:text-dark-text heading-kinetic"
        trigger="onScroll"
        staggerDelay={40}
      />
      {subtitle && (
        <p className="mt-3 text-warm-gray text-base md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
