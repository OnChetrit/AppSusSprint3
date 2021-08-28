export function Review({ review, onDeleteReview, onGetTime }) {
  if (!review) return <div>Loading..</div>;
  // const time = onGetTime(review.rightAt);
  // let timeAgo;
  // if (time.day) {
  //   timeAgo = `${time.day}d ago`;
  // } else if (time.hours) {
  //   timeAgo = `${time.hours}h ago`;
  // } else if (time.minutes) {
  //   timeAgo = `${time.minutes}m ago`;
  // } else {
  //   timeAgo = `${time.seconds}s ago`;
  // }
  return (
    <div className="review flex items-center">
      {/* <button onClick={deleteReview}>X</button> */}
      <div className="review-username">
        <h4>{review.name[0].toUpperCase()}</h4>
      </div>
      <div className="txt-review flex direction-col justify-center">
        <h4>{review.name[0].toUpperCase() + review.name.substring(1)}</h4>
        <p>{review.txt}</p>
      </div>
      <h5 className="review-time">Like · Replay · {review.rightAt}</h5>
      {/* <h5 className="review-time">Like · Replay · {timeAgo}</h5> */}
      <div className="review-star">
        <h5 className="rate-star">{review.rate}</h5>
        <i className="fa fa-star hint-star" aria-hidden="true"></i>
      </div>
      <button
        className="btn"
        onClick={() => {
          onDeleteReview(review.id);
        }}
      >
        <img src="../img/book/close.png"></img>
      </button>
    </div>
  );
}
