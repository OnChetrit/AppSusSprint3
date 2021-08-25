export class KeepFilter extends React.Component {
  state = { filterBy: null };

  render() {
    const { onToggleCompose } = this.props;
    return (
      <div className="">
        <div className="filter">Inbox</div>
        <div className="filter">Stars</div>
      </div>
    );
  }
}
