export class MailSearch extends React.Component {
  state = {
    SearchBy: '',
  };
  handleChange = ({ target }) => {
    const value = target.value;
    this.setState({ SearchBy: value });
  };

  onSearch = (ev) => {
    ev.preventDefault();
    this.props.onSetSearch(this.state.SearchBy);
  };

  render() {
    return (
      <form className="mail-search" onChange={this.onSearch}>
        <label htmlFor="search"></label>
        <img src="../img/search.png" />
        <input
          className="input-search"
          name="search"
          id="search"
          type="text"
          placeholder="username"
          onChange={this.handleChange}
        />
      </form>
    );
  }
}
