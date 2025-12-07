'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import CamperCard from '../CamperCard/CamperCard';
import Loader from '../UI/Loader';
import css from './CamperList.module.css';

export default function CamperList() {
  const { campers, isLoading, error, fetchCampers, hasMore, loadMore } =
    useStore();

  const showLoadMore = hasMore && !isLoading && campers.length > 0;

  useEffect(() => {
    if (campers.length === 0) {
      fetchCampers();
    }
  }, []);

  return (
    <section className={css.listSection}>
      {error && (
        <div
          style={{ textAlign: 'center', marginTop: '20px', color: '#E44848' }}
        >
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              cursor: 'pointer',
            }}
          >
            Try to reload
          </button>
        </div>
      )}

      <div className={css.cart}>
        {campers.length > 0
          ? campers.map(camper => (
              <CamperCard key={camper.id} camper={camper} />
            ))
          : !isLoading &&
            !error && (
              <div className={css.emptyMessageWrapper}>
                <p className={css.emptyMessageTitle}>
                  No campers found matching your search.
                </p>
                <p className={css.emptyMessageSubtitle}>
                  Try changing your filters or search criteria.
                </p>
              </div>
            )}
      </div>

      {isLoading && (
        <div className={css.loaderWrapper}>
          <Loader />
        </div>
      )}

      {showLoadMore && (
        <button onClick={loadMore} className={css.loadMoreBtn} type="button">
          Load More
        </button>
      )}
    </section>
  );
}
