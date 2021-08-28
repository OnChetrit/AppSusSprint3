import { bookService } from '../services/book.service';

export class ReviewAdd extends React.Component {
  state = {
    review: {
      txt: '',
      name: '',
      rate: 0,
    },
  };

  componentDidMount() {}

  onAddReview = (ev) => {
    ev.preventDefault();
    this.props.onSaveReview(this.state.review, false);
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'select-one' ? +target.value : target.value;
    this.setState((prevState) => ({
      review: { ...prevState.review, [field]: value },
    }));
  };

  render() {
    return (
      <form className="add-review" onSubmit={this.onAddReview}>
        <label htmlFor="name"></label>
        <input
          type="text"
          className="fullname"
          name="name"
          id="name"
          required
          placeholder="Full Name"
          onChange={this.handleChange}
        />
        <label htmlFor="rate"></label>
        <select
          name="rate"
          id="rate"
          type="number"
          onChange={this.handleChange}
        >
          <option value="1">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label htmlFor="txt"></label>
        <textarea
          name="txt"
          rows="5"
          cols="40"
          id="txt"
          required
          placeholder="Your review"
          onChange={this.handleChange}
        ></textarea>
        <button>Add review</button>
      </form>
    );
  }
}
