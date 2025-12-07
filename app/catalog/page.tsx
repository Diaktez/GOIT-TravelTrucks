import CamperFilters from '@/components/CamperFilters/CamperFilters';
import CamperList from '@/components/CamperList/CamperList';
import css from './Catalog.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalog | TravelTrucks',
  description:
    'Rent the best campers in Ukraine. Fully equipped, comfortable and ready for adventure.',

  openGraph: {
    title: '🚐 Rent Your Dream Camper | TravelTrucks',
    description:
      'Find the perfect camper for your trip. AC, Kitchen, Shower & more!',
    type: 'website',
  },
};

export default function CatalogPage() {
  return (
    <div className="container">
      <section className={css.catalogSection}>
        <CamperFilters />

        <div className={css.rightColumn}>
          <CamperList />
        </div>
      </section>
    </div>
  );
}
