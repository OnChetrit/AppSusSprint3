export class MailFilter extends React.Component {
  state = { filterBy: 'inbox' };

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, () => {
      this.props.onSetFilterBy(filterBy);
    });
  };
  checkIsActive = (folderName) => {
    return folderName === this.state.filterBy ? 'marked' : '';
    // return folderName === this.state.filterBy && !criteria.isStarred ? 'marked' : '';
  };

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
          <div
            onClick={() => {
              this.onSetFilter('inbox');
            }}
            className={`filter ${this.checkIsActive('inbox')} `}
          >
            Inbox
          </div>
          <div
            onClick={() => {
              this.onSetFilter('stars');
            }}
            className={`filter ${this.checkIsActive('stars')} `}
          >
            Stars
          </div>
          <div
            onClick={() => {
              this.onSetFilter('spam');
            }}
            className={`filter ${this.checkIsActive('spam')} `}
          >
            Spam
          </div>
          <div
            onClick={() => {
              this.onSetFilter('sent');
            }}
            className={`filter ${this.checkIsActive('sent')} `}
          >
            Sent
          </div>
        </div>
      </div>
    );
  }
}
