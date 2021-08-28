export function Rating({ book, rate, rating, reviews, getStarRate }) {
  return (
    <React.Fragment>
      <span className="hint-star">
        {getStarRate(rate)}
        <span className="rating">
          {rating.toFixed(1)} Ratings · {reviews.length} Reviews
        </span>
      </span>
    </React.Fragment>
  );
}
