'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Camper } from '@/types/camper';
import css from './CamperCard.module.css';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import style from '../UI/Button.module.css';

interface Props {
  camper: Camper;
}

export default function CamperCard({ camper }: Props) {
  let formattedLocation = camper.location;
  if (camper.location && camper.location.includes(',')) {
    const parts = camper.location.split(',').map(part => part.trim());
    if (parts.length >= 2) {
      formattedLocation = `${parts[1]}, ${parts[0]}`;
    }
  }

  const imageUrl = camper.gallery?.[0]?.thumb || '../../public/img/hero.jpg';

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          className={css.image}
          src={imageUrl}
          alt={camper.name}
          fill
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 290px"
        />
      </div>

      <div className={css.details}>
        <div className={css.header}>
          <div className={css.priceRow}>
            <h2 className={css.title}>{camper.name}</h2>
            <div className={css.priceWrapper}>
              <p className={css.price}>€{camper.price}</p>
              <FavoriteButton camper={camper} />
            </div>
          </div>
          <div className={css.ratingLocation}>
            <div className={css.ratingWrapper}>
              <svg width={16} height={16}>
                <use href="/icons.svg#icon-star"></use>
              </svg>
              <span className={css.rating}>
                {camper.rating} ({camper.reviews.length} Reviews)
              </span>
            </div>
            <div className={css.location}>
              <svg width={16} height={16}>
                <use href="/icons.svg#icon-loc"></use>
              </svg>
              {formattedLocation}
            </div>
          </div>
        </div>

        <p className={css.description}>{camper.description}</p>

        <div className={css.categories}>
          <span className={css.badge}>
            <svg width={20} height={20}>
              <use href="/icons.svg#icon-automatic"></use>
            </svg>
            {camper.transmission}
          </span>
          <span className={css.badge}>
            <svg width={20} height={20}>
              <use href="/icons.svg#icon-fuel-pump"></use>
            </svg>
            {camper.engine}
          </span>
          {camper.kitchen && (
            <span className={css.badge}>
              <svg width={20} height={20}>
                <use href="/icons.svg#icon-cup-hot"></use>
              </svg>
              Kitchen
            </span>
          )}
          {camper.AC && (
            <span className={css.badge}>
              <svg width={20} height={20}>
                <use href="/icons.svg#icon-wind"></use>
              </svg>
              AC
            </span>
          )}
        </div>

        <Link
          prefetch={false}
          href={`/catalog/${camper.id}`}
          className={` ${style.button} ${css.showMoreBtn}`}
        >
          Show more
        </Link>
      </div>
    </div>
  );
}
