import { Camper } from '@/types/camper';
import ReviewCard from './ReviewCard';
import css from './Reviews.module.css';

interface Props {
  camper: Camper;
}

export default function Reviews({ camper }: Props) {
  if (!camper.reviews || camper.reviews.length === 0) {
    return (
      <p className={css.noReviews}>No reviews yet. Be the first to review!</p>
    );
  }

  return (
    <div className={css.reviewsWrapper}>
      <ul className={css.reviewsList}>
        {camper.reviews.map((review, index) => (
          <li key={index}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
    </div>
  );
}
