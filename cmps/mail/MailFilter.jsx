export class MailFilter extends React.Component {
  state = {
    filterBy: 'inbox',
  };

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, () => {
      this.props.onSetFilterBy(filterBy);
    });
  };
  checkIsActive = (folderName) => {
    if (folderName === this.state.filterBy) {
      if (folderName === 'inbox') {
        return 'marked-red';
      } else {
        return 'marked-gray';
      }
    }
  };

  render() {
    const { onToggleCompose, unreadMails } = this.props;
    const { filterBy } = this.state;
    return (
      <div className="side-nav flex direction-col">
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
            className={`flex filter ${this.checkIsActive('inbox')} `}
          >
            <img
              src={`../img/mail/${
                filterBy === 'inbox' ? 'inbox-active' : 'inbox-filter'
              }.png`}
            />
            Inbox{' '}
            <span className="unread-preview">
              {unreadMails ? unreadMails : ''}
            </span>
          </div>
          <div
            onClick={() => {
              this.onSetFilter('stars');
            }}
            className={`flex filter ${this.checkIsActive('stars')} `}
          >
            <img src="../img/mail/star-filter.png" />
            Stars
          </div>
          <div
            onClick={() => {
              this.onSetFilter('archive');
            }}
            className={`flex filter ${this.checkIsActive('archive')} `}
          >
            <img src="../img/mail/archive-filter.png" />
            Important
          </div>
          <div
            onClick={() => {
              this.onSetFilter('read');
            }}
            className={`flex filter ${this.checkIsActive('read')} `}
          >
            <img src="../img/mail/unread.png" />
            Read
          </div>
          <div
            onClick={() => {
              this.onSetFilter('unread');
            }}
            className={`flex filter ${this.checkIsActive('unread')} `}
          >
            <img src="../img/mail/read.png" />
            UnRead
          </div>
          <div
            onClick={() => {
              this.onSetFilter('sent');
            }}
            className={`flex filter ${this.checkIsActive('sent')} `}
          >
            <img src="../img/mail/send-filter.png" />
            Sent
          </div>
          <div
            onClick={() => {
              this.onSetFilter('draft');
            }}
            className={`flex filter ${this.checkIsActive('draft')} `}
          >
            <img src="../img/mail/draft-filter.png" />
            Draft
          </div>
          <div
            onClick={() => {
              this.onSetFilter('trash');
            }}
            className={`flex filter ${this.checkIsActive('trash')} `}
          >
            <img src="../img/mail/trash-filter.png" />
            Trash
          </div>
        </div>
      </div>
    );
  }
}
