'use client';

import React from 'react';
import css from './BookingForm.module.css';
import style from '@/components/UI/Button.module.css';

export default function BookingForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.alert('Booking successful! We will contact you soon.');
    window.location.reload();
  };

  return (
    <div className={css.formWrapper}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name*"
          className={css.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email*"
          className={css.input}
          required
        />

        <input
          type="text"
          name="bookingDate"
          placeholder="Booking date*"
          className={`${css.input} ${css.dateInput}`}
          required
          onFocus={e => (e.target.type = 'date')}
          onBlur={e => {
            if (!e.target.value) {
              e.target.type = 'text';
            }
          }}
        />

        <textarea
          name="comment"
          placeholder="Comment"
          className={`${css.input} ${css.textarea}`}
          rows={5}
        ></textarea>

        <button type="submit" className={`${css.submitButton} ${style.button}`}>
          Send
        </button>
      </form>
    </div>
  );
}
