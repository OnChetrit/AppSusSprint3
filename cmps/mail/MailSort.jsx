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


  render() {
    return (
      <div className="mail-sort">
        <div className="sort-container">
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
        </div>
      </div>
    );
 }
}

