import { Review } from './Review.jsx';
import { ReviewAdd } from './ReviewAdd.jsx';

export function ReviewList({
  reviews,
  onDeleteReview,
  onGetTime,
  isAddReview,
  onSaveReview,
}) {
  return (
    <div className="review-list flex direction-col">
      {isAddReview && <ReviewAdd onSaveReview={onSaveReview} />}
      {!reviews.length && <div>No Reviews...</div>}
      {reviews.map((review, idx) => (
        <Review
          key={idx}
          review={review}
          onDeleteReview={onDeleteReview}
          onGetTime={onGetTime}
        />
      ))}
    </div>
  );
}
