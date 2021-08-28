import { bookService } from '../services/book.service.js';

const { Link } = ReactRouterDOM;

export function BookPreview({ book, getIcon }) {
  const getCatagories = (categories) => {
    return categories.map((catagory) => (
      <span
        key={catagory}
        className={`tag tag-${catagory.length > 4 ? 'teal' : 'purple'}`}
      >
        {' '}
        {catagory}{' '}
      </span>
    ));
  };

  const getAuthors = (authors) => {
    return authors.map((author) => <h5 key={author}>{author}</h5>);
  };

  const getPriceColor = (price) => {
    return price > 150
      ? 'price-red'
      : book.listPrice.amount < 20
      ? 'price-green'
      : '';
  };

  const { id, thumbnail, categories, title, authors, listPrice } = book;
  const { amount, currencyCode } = listPrice;

  return (
    <article className="book-preview btn">
      <Link to={`/book/${id}`}>
        <div className="book-header">
          <img src={thumbnail} />
        </div>
        <div className="book-body">
          <div className="book-info">
            <div className="tags flex justify-center">
              {getCatagories(categories)}
            </div>
            <h4>{title}</h4>
          </div>
          <div>
            <div className="author-info">{getAuthors(authors)}</div>
            <p className={getPriceColor(amount)}>
              {amount} {bookService.getIcon(currencyCode)}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
