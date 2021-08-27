export class KeepFilter extends React.Component {
  state = { filterBy: null };

  render() {
    return (
      <div className=" flex direction-col ">
        <div className="filter">Text</div>
        <div className="filter">Images</div>
        <div className="filter">To Do Lists</div>
      </div>
    );
  }
}
