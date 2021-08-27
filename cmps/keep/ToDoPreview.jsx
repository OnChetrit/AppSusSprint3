import { NoteEdit } from './NoteEdit.jsx';

export class ToDosPreview extends React.Component {
  state = {
    isEdit: false,
  };

  toggleEdit = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };

  render() {
    const { toDo, isDone } = this.props.toDo;
    const { idx, onToggleDone, onUpdateNote } = this.props;
    const noteId = this.props.note.id;

    return (
      <React.Fragment>
        <div className={isDone ? 'checked todo-item' : 'todo-item'}>
          <img
            className="checkbox"
            onClick={() => {
              onToggleDone(idx, noteId);
            }}
            src={`assets/img/${
              isDone ? 'checked-square-icon' : 'square-icon'
            }.png`}
          />
          {this.state.isEdit ? (
            <NoteEdit
              onUpdateNote={onUpdateNote}
              toggleEdit={this.toggleEdit}
              toDo={toDo}
              idx={idx}
              noteId={noteId}
            />
          ) : (
            <React.Fragment>
              <span className="note-caption" onClick={this.toggleEdit}>
                {toDo}
              </span>
              <div className="delete-btn-container">
                <button
                  className="remove-btn"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    this.props.onRemoveTodo(idx, this.props.note.id);
                  }}
                >
                  <img src="assets/img/x-icon.png" />
                </button>
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}
