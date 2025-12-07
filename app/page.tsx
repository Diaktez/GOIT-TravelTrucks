import Hero from '@/components/Hero/Hero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TravelTrucks',
  description:
    'Rent the best campers in Ukraine. Fully equipped, comfortable and ready for adventure.',
  openGraph: {
    title: 'TravelTrucks',
    description:
      'Find the perfect camper for your trip. AC, Kitchen, Shower & more!',
    type: 'website',
  },
};
export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
