import { Review } from '@/types/camper';
import css from './ReviewCard.module.css';

interface Props {
  review: Review;
}

const renderStars = (rating: number) => {
  const stars = [];

  const roundedRating = Math.round(rating);

  for (let i = 0; i < 5; i++) {
    const isFilled = i < roundedRating;
    const iconId = isFilled ? '#icon-star-filled' : '#icon-star-empty';

    stars.push(
      <svg key={i} width={16} height={16} className={css.starIcon}>
        <use href={`/icons.svg${iconId}`}></use>
      </svg>
    );
  }
  return stars;
};

export default function ReviewCard({ review }: Props) {
  const reviewerInitial = review.reviewer_name.charAt(0).toUpperCase();

  return (
    <div className={css.reviewCard}>
      <div className={css.header}>
        <div className={css.avatar}>
          <p className={css.initial}>{reviewerInitial}</p>
        </div>

        <div className={css.info}>
          <h4 className={css.name}>{review.reviewer_name}</h4>
          <div className={css.ratingStars}>
            {renderStars(review.reviewer_rating)}
          </div>
        </div>
      </div>

      <p className={css.comment}>{review.comment}</p>
    </div>
  );
}
