export class BookFilter extends React.Component {
  state = {
    filterBy: {
      title: '',
      minPrice: '',
      maxPrice: '',
    },
  };

  handleChange = (ev) => {
    const field = ev.target.name;
    if (!field) return;
    const value =
      ev.target.type === 'number' ? +ev.target.value : ev.target.value;
    this.setState(
      { filterBy: { ...this.state.filterBy, [field]: value } },
      () => {
        this.props.onSetFilter(this.state.filterBy);
      }
    );
  };

  onFilter = (ev) => {
    ev.preventDefault();
    this.props.onSetFilter(this.state.filterBy);
  };

  render() {
    const {
      title,
      minPrice: minPrice,
      maxPrice: maxPrice,
    } = this.state.filterBy;
    return (
      <form className="book-filter flex main-layout" onSubmit={this.onFilter}>
        <div className="form-group">
          <input
            className="form-input"
            name="title"
            id="by-title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-input"
            name="minPrice"
            id="min-price"
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-input"
            name="maxPrice"
            id="max-price"
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}
