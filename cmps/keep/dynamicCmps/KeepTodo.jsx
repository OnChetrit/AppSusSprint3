import { KeepActions } from '../KeepActions.jsx';
import { ToDoPreview } from '../ToDoPreview.jsx';

export class KeepTodo extends React.Component {
  state = { keep: '' };

  componentDidMount() {
    this.setState({ keep: this.props.keep });
  }

  render() {
    const {
      onKeepColorChange,
      onDuplicateKeep,
      onRemoveKeep,
      setSendMail,
      onCheckTodo,
      onDeleteTodo,
      onPinKeep,
      keep,
    } = this.props;

    const { todos, title } = keep.info;
    if (!keep) return <div className=""></div>;
    return (
      <div className="keep" style={{ backgroundColor: keep.color }}>
        <h4>{title}</h4>
        <ul className="todos-content clean-list">
          {todos.map((todo, idx) => {
            return (
              <ToDoPreview
                key={idx}
                todo={todo}
                onCheckTodo={onCheckTodo}
                onDeleteTodo={onDeleteTodo}
                onRemoveKeep={onRemoveKeep}
              />
            );
          })}
        </ul>
        <KeepActions
          onKeepColorChange={onKeepColorChange}
          onDuplicateKeep={onDuplicateKeep}
          onRemoveKeep={onRemoveKeep}
          setSendMail={setSendMail}
          onPinKeep={onPinKeep}
          keep={keep}
        />
      </div>
    );
  }
}
