import { BookPreview } from './BookPreview.jsx';

export function BookList({ books, onSelectBook, getIcon }) {
  return (
    <div className="book-list flex justify-center align-center">
      {books.map((book) => (
        <BookPreview
          key={book.id}
          book={book}
          getIcon={getIcon}
          onSelectBook={onSelectBook}
        />
      ))}
    </div>
  );
}
