export function ToDoPreview({ todo, onCheckTodo }) {
  return (
    <li className="">
      <input
        type="checkbox"
        className="btn"
        checked={todo.doneAt}
        onClick={() => {
          onCheckTodo(todo.id);
        }}
      />{' '}
      <span
        className={todo.doneAt ? 'checked btn' : 'btn'}
        onClick={() => {
          onCheckTodo(todo.id);
        }}
      >
        {todo.txt}
      </span>
    </li>
  );
}
