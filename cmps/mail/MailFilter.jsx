export class MailFilter extends React.Component {
  state = { filterBy: null };

  onSetFilter = (filterBy) => {
    this.setState({ filterBy}, () => {this.props.onSetFilterBy(filterBy)})
  }

  render() {
    const { onToggleCompose } = this.props;
    return (
      <div className="side-nav">
        <button
        className="btn compose-btn"
          onClick={() => {
            onToggleCompose();
          }}
        >
          Compose
        </button>
        <div className="filters-container">

        <div className="filter" onClick={() => {this.onSetFilter('inbox')}}>Inbox</div>
        <div className="filter" onClick={() => {this.onSetFilter('stars')}}>Stars</div>
        <div className="filter" onClick={() => {this.onSetFilter('spam')}}>Spam</div>
        <div className="filter" onClick={() => {this.onSetFilter('sent')}}>Sent</div>
        </div>
      </div>
    );
  }
}
