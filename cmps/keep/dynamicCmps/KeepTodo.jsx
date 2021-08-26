export class KeepTodo extends React.Component {
  state = { todo: '' };

  componentDidMount() {
    this.setState({ todo: this.props.todo });
  }

  render() {
    const { keep } = this.props;
    if (!keep) return <div className=""></div>;
    return (
      <div className="keep">
        <h4>{keep.info.title}</h4>
        {keep.info.todos.map((todo, idx) => {
          return <p key={idx}>{todo.txt}</p>;
        })}
      </div>
    );
  }
}
