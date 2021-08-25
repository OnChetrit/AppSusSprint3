export class MailFilter extends React.Component {
  state = { filterBy: null };

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

        <div className="filter">Inbox</div>
        <div className="filter">Stars</div>
        </div>
      </div>
    );
  }
}
