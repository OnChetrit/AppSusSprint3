import { Rating } from '../cmps/book/Rating.jsx';
import { ReviewList } from '../cmps/book/ReviewList.jsx';
import { bookService } from '../services/book.service.js';
import { utilService } from '../services/util.service.js';
import { AppHeader } from '../cmps/AppHeader.jsx';
import { userService } from '../services/user.service.js';

const { Link } = ReactRouterDOM;

export class BookDetails extends React.Component {
  state = {
    user: null,
    book: null,
    isAddReview: false,
    rate: 0,
    reviews: [],
    rating: 0,
  };

  componentDidMount() {
    this.loadBook();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
      this.loadBook();
    }
  }

  loadUser = () => {
    userService.query().then((users) => {
      if (!users) this.props.history.push('/');
      const user = users[0];
      this.setState({ user });
    });
  };

  loadBook = () => {
    const id = this.props.match.params.bookId;
    bookService
      .getBookById(id)
      .then((book) => {
        if (!book) this.props.history.push('/book');
        this.setState({ book });
        return book;
      })
      .then((newBook) => {
        bookService.getRate(newBook).then((res) => {
          const rate = res.rate ? res.rate : 0;
          const reviews = res.reviews;
          this.setRate(rate);
          this.setState({ reviews });
        });
      });
    this.loadUser();
  };

  setRate = (rate) => {
    this.setState({ rate, rating: rate });
  };

  getAuthors = (authors) => {
    return authors.map((author) => <h2 key={author}>{author}</h2>);
  };

  getPriceClass = (price) => {
    if (price > 150) return 'price-red';
    if (price < 20) return 'price-green';
    return '';
  };

  getPageCount = (num) => {
    if (num > 500) return num + ' - Long reading';
    if (num > 200) return num + ' - Decent reading';
    if (num < 100) return num + ' - Light rading';
    return num;
  };

  getPublishYear = (year) => {
    const currYear = new Date().getFullYear();
    const diff = currYear - year;
    if (diff > 10) return 'Veteran Book';
    if (diff < 2) return 'New!';
  };

  getLang = (lang) => {
    switch (lang) {
      case 'he':
        return 'Hebrew';
      case 'en':
        return 'English';
      case 'sp':
        return 'Spanish';
    }
  };

  onDeleteReview = (reviewId) => {
    const { id } = this.state.book;
    bookService.removeReview(reviewId, this.state.reviews).then(() => {
      this.props.history.push(`/book/${id}`);
    });
  };

  onBack = () => {
    this.props.history.push('/book');
  };

  getStarRate = (stars) => {
    let strHtml = [];
    for (let i = 0; i < Math.floor(stars); i++) {
      strHtml.push(
        <i
          key={utilService.makeId(3)}
          className="fa fa-star"
          aria-hidden="true"
        ></i>
      );
    }
    if (stars < 5) {
      for (let i = 0; i < 5 - stars; i++) {
        strHtml.push(
          <i
            key={utilService.makeId(3)}
            className="fa fa-star-o"
            aria-hidden="true"
          ></i>
        );
      }
    }
    return strHtml;
  };
  onGetTime = (timestamp) => {
    return bookService.getTime(timestamp);
  };

  onSaveReview = (review, bool) => {
    const { id } = this.state.book;
    bookService.addReview(review, id).then((book) => {
      this.setState({ book, isAddReview: bool });
      this.loadBook();
    });
  };

  render() {
    const { user, book, isAddReview, rate, rating, reviews } = this.state;
    if (!book || !user) return <div>'Loading....'</div>;
    const {
      thumbnail,
      title,
      authors,
      subtitle,
      description,
      publishedDate,
      listPrice,
    } = book;

    const { amount, currencyCode } = listPrice;

    return (
      <div className="book-page">
        <header>
          <AppHeader user={user} />
        </header>
        <section className="book-details">
          <div className="thumbnail">
            <img className="book-cover" src={thumbnail} />
          </div>
          <div className="book-info-large">
            <h1>{title}</h1>
            <Rating
              book={book}
              rate={rate}
              rating={rating}
              reviews={reviews}
              getStarRate={this.getStarRate}
            />
            <div className="author">{this.getAuthors(authors)}</div>
            <div className="separator"></div>
            <p>{subtitle}</p>
            <p>{description}</p>
            <h4 className={this.getPriceClass(amount)}>
              {amount}
              {bookService.getIcon(currencyCode)}
            </h4>
            <div
              onClick={() => {
                this.setState({ isAddReview: !isAddReview });
              }}
              className="add-review-btn btn"
            >
              Add Review
            </div>
          </div>
          <h5>{publishedDate}</h5>
          <h6>{this.getPublishYear(publishedDate)}</h6>
          <div className="return btn" onClick={this.onBack}>
            <img className="return-img" src="./img/book/return.png" />
          </div>
        </section>
        {reviews && (
          <ReviewList
            reviews={reviews}
            onDeleteReview={this.onDeleteReview}
            onGetTime={this.onGetTime}
            isAddReview={isAddReview}
            onSaveReview={this.onSaveReview}
          />
        )}
      </div>
    );
  }
}
