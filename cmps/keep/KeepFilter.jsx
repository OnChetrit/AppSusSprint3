export class KeepFilter extends React.Component {
  state = { filterBy: null };

  render() {
    const { onToggleCompose } = this.props;
    return (
      <div className="side-nav">
        <div className="filter">Text</div>
        <div className="filter">Images</div>
        <div className="filter">To Do Lists</div>
      </div>
    );
  }
}
