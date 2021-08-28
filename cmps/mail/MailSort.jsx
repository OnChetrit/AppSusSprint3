import { userService } from '../../services/user.service.js';

export class MailSort extends React.Component {
  state = {
    SortedBy: '',
    selected: false,
  };

  onSetSort = (SortedBy) => {
    this.setState({ SortedBy }, () => {
      this.props.onSetSortedBy(SortedBy);
    });
  };

  onSetRemoveSelected = () => {
    this.props.onRemoveSelected();
  };
  onSetRemoveSelectedFromTrash = () => {
    this.props.onRemoveSelectedFromTrash();
  };

  onSetSelectedToArchive = () => {
    this.props.onSelectedArchive();
  };

  onSetSelectedRead = () => {
    this.props.onSetSelectedRead();
  };
  onSetRestoreSelected = () => {
    this.props.onRestoreSelected();
  };
  onSelectAll = () => {
    this.props.onSelectAll();
  };
  onSetSelected = () => {
    this.onSelectAll();
    const selected = userService.getSelectedMails(this.props.mails);
    if (selected.length) {
      this.setState({ selected: true });
    } else {
      this.setState({ selected: false });
    }
  };

  render() {
    const { selected } = this.state;
    return (
      <div className="sort-container flex">
        <div className="sort-actions">
          <button
            onClick={() => this.onSetSelected()}
            title="Select All"
            className={`btn selecting`}
          >
            {selected ? (
              <img src="img/mail/unselect.png" />
            ) : (
              <img src="img/mail/select.png" />
            )}
            {/* <img src="../img/mail/select.png" /> */}
          </button>
          <button
            onClick={() => {
              this.onSetSort('title');
            }}
            className={`sort sort-title`}
          >
            <span>Title</span>
          </button>
          <button
            onClick={() => {
              this.onSetSort('subject');
            }}
            className={`sort sort-subject`}
          >
            <span>Subject</span>
          </button>
          <button
            onClick={() => {
              this.onSetSort('date');
            }}
            className={`sort sort-date`}
          >
            <span>Date</span>
          </button>
        </div>
        <div
        // className={`selected-actions ${selected ? '' : 'hide'}`}
        >
          <button
            title="Remove"
            onClick={() => this.onSetRemoveSelected()}
            className={`btn reset-btn selected remove-selected`}
          >
            <div className="icon-container">
              <img src="img/mail/trash-filter.png" />
            </div>
          </button>

          <button
            onClick={() => this.onSetRemoveSelectedFromTrash()}
            className={`selected remove-selected`}
          >
            Remove trash Selected
          </button>
          <button
            onClick={() => this.onSetRestoreSelected()}
            className={`selected restore-selected`}
          >
            Restore Selected
          </button>
          <button
            onClick={() => this.onSetSelectedToArchive()}
            className={`selected archive-selected`}
          >
            Selected to archive
          </button>
          <button
            onClick={() => this.onSetSelectedRead()}
            className={`selected read-selected`}
          >
            Selected to read/unread
          </button>
        </div>
      </div>
    );
  }
}
