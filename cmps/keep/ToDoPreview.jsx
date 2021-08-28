export function ToDoPreview({ todo, onCheckTodo, onDeleteTodo }) {
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
      <svg
        className="delete-todo btn"
        onClick={() => {
          onDeleteTodo();
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    </li>
  );
}
