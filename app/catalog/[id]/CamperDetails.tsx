'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camper } from '@/types/camper';
import Features from './Features';
import Reviews from './Reviews';
import css from './CamperDetails.module.css';
import FavoriteButton from '@/components/FavoriteButton/FavoriteButton';
import BookingForm from './BookingForm';

interface Props {
  camper: Camper;
}

type Tab = 'features' | 'reviews';

export default function CamperDetails({ camper }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('features');

  let formattedLocation = camper.location;
  if (camper.location && camper.location.includes(',')) {
    const parts = camper.location.split(',').map(part => part.trim());
    if (parts.length >= 2) {
      formattedLocation = `${parts[1]}, ${parts[0]}`;
    }
  }

  const renderMainInfo = () => (
    <div className={css.details}>
      <div className={css.header}>
        <div className={css.titleWrapper}>
          <h2 className={css.title}>{camper.name}</h2>
          <FavoriteButton camper={camper} />
        </div>
        <div className={css.ratingWrapper}>
          <div className={css.rating}>
            <svg width={16} height={16}>
              <use href="/icons.svg#icon-star"></use>
            </svg>
            <span className={css.reviews}>
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
        <p className={css.price}>€{camper.price}</p>
      </div>

      {/* galery */}
      <div className={css.galery}>
        {camper.gallery.slice(0, 3).map((item, index) => (
          <Image
            key={index}
            src={item.original}
            alt={camper.name}
            width={290}
            height={312}
            priority={true}
            className={css.image}
          />
        ))}
      </div>
      <p className={css.text}>{camper.description}</p>
    </div>
  );

  return (
    <section>
      {renderMainInfo()}

      <div className={css.tabs}>
        <button
          onClick={() => setActiveTab('features')}
          className={`${css.tabButton} ${
            activeTab === 'features' ? css.activeTab : ''
          }`}
        >
          Features
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`${css.tabButton} ${
            activeTab === 'reviews' ? css.activeTab : ''
          }`}
        >
          Reviews
        </button>
      </div>

      <div className={css.contentAndFormWrapper}>
        <div className={css.tabContentBlock}>
          {activeTab === 'features' && <Features camper={camper} />}
          {activeTab === 'reviews' && <Reviews camper={camper} />}
        </div>

        <div className={css.staticFormBlock}>
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
