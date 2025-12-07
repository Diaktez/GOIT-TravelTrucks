import CamperFilters from '@/components/CamperFilters/CamperFilters';
import CamperList from '@/components/CamperList/CamperList';
import css from './Catalog.module.css';

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
