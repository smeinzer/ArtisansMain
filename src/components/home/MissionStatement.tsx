'use client';

import ScrollHighlight from '@/components/ui/ScrollHighlight';

export default function MissionStatement() {
  return (
    <section className="py-28 md:py-40 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-terracotta mb-8 md:mb-10">
          Our Purpose
        </p>
        <ScrollHighlight
          text="To champion the makers of the Blue Ridge. To put beautiful, handcrafted objects in the hands of people who will cherish them. And to prove that a small gallery on a small-town main street can make a real difference in the lives of artists."
          as="p"
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.2] tracking-tight"
        />
      </div>
    </section>
  );
}
