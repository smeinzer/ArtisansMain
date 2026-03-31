import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Announcements from '@/components/home/Announcements';
import VisitTeaser from '@/components/home/VisitTeaser';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Announcements />
      <VisitTeaser />
    </>
  );
}
