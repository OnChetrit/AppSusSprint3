import { KeepActions } from '../KeepActions.jsx';
import { ToDosPreview } from '../ToDosPreview.jsx';

export class KeepTodo extends React.Component {
  state = { todo: '' };

  componentDidMount() {
    this.setState({ todo: this.props.todo });
  }

  render() {
    const {
      keep,
      onRemoveKeep,
      onKeepColorChange,
      onDuplicateKeep,
      onPinKeep,
      setSendMail,
    } = this.props;
    if (!keep) return <div className=""></div>;
    return (
      <div className="keep" style={{ backgroundColor: keep.color }}>
        <h4>{keep.info.title}</h4>
        <div className="note-content">
          {keep.info.todos.map((todo, idx) => {
            return (
              <ToDosPreview key={idx} todo={todo} onRemoveKeep={onRemoveKeep} />
            );
          })}
        </div>
        <KeepActions
          onKeepColorChange={onKeepColorChange}
          onDuplicateKeep={onDuplicateKeep}
          onRemoveKeep={onRemoveKeep}
          onPinKeep={onPinKeep}
          setSendMail={setSendMail}
          keep={keep}
        />
      </div>
    );
  }
}
