import { bookService } from '../services/book.service.js';
import { BookList } from '../cmps/book/BookList.jsx';
import { BookFilter } from '../cmps/book/BookFilter.jsx';
import { AppHeader } from '../cmps/AppHeader.jsx';
import { userService } from '../services/user.service.js';

export class BookApp extends React.Component {
  state = {
    books: null,
    filterBy: null,
    user: null,
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    bookService.query(this.state.filterBy).then((books) => {
      this.setState({ books });
    });
    this.loadUser();
  };

  loadUser = () => {
    userService.query().then((users) => {
      if (!users) this.props.history.push('/');
      const user = users[0];
      this.setState({ user });
    });
  };

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadBooks);
  };

  render() {
    const { books, user } = this.state;
    if (!books || !user) return <div>Loading...</div>;
    return (
      <section className="book-app">
        <header>
          <AppHeader user={user} />
        </header>
        <BookFilter onSetFilter={this.onSetFilter} />
        <BookList books={books} onSelectBook={this.onSelectBook} />
      </section>
    );
  }
}
