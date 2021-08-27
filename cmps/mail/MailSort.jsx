export class MailSort extends React.Component {
  state = { SortedBy: '' };

  onSetSort= (SortedBy) => {
    this.setState({ SortedBy }, () => {
      this.props.onSetSortedBy(SortedBy);
    });
  }
  
  onSetRemoveSelected = () => {
    this.props.onRemoveSelected();
   }

   onSetSelectedToArchive = () => {
    this.props.onSelectedArchive();
   }

   onSetSelectedRead = () => {
     this.props.onSetSelectedRead()
    }
    onSetRestoreSelected = () => {   
      this.props.onRestoreSelected();
   }
   onSelectAll = () => {
     this.props.onSelectAll();
   }


  render() {
    return (
      <div className="mail-sort">
        <div className="sort-container">
          <button onClick={ () => this.onSelectAll()}
            className={`sort`}>Select All
            </button>
            <button onClick={() => {
              this.onSetSort('title');
            }}
            className={`sort`}>Title
                
            </button>
            <button onClick={() => {
              this.onSetSort('subject');
            }}
            className={`sort`}>Subject
            </button>
            <button onClick={() => {
              this.onSetSort('date');
            }}
            className={`sort`}>Date
            </button>
            <button onClick={ () => this.onSetRemoveSelected()}
            className={`sort`}>Remove Selected
            </button>
            <button onClick={ () => this.onSetRestoreSelected()}
            className={`sort`}>Restore Selected
            </button>
            <button onClick={ () => this.onSetSelectedToArchive()}
            className={`sort`}>Selected to archive
            </button>
            <button onClick={ () => this.onSetSelectedRead()}
            className={`sort`}>Selected to read/unread
            </button>
        </div>
      </div>
    );
 }
}

