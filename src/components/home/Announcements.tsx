import { demoAnnouncements } from '@/lib/demo';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export default function Announcements() {
  const active = demoAnnouncements.filter((a) => a.isActive);

  if (active.length === 0) return null;

  return (
    <section className="py-16 md:py-20 px-6 bg-cream-dark">
      <div className="max-w-3xl mx-auto space-y-8">
        {active.map((announcement, i) => (
          <AnimateOnScroll key={announcement.id} delay={i * 100}>
            <article className="border-l-2 border-terracotta pl-6">
              <h3 className="text-lg md:text-xl font-medium leading-snug">
                {announcement.title}
              </h3>
              <p className="mt-2 text-sm text-warm-gray leading-relaxed">
                {announcement.body}
              </p>
            </article>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
