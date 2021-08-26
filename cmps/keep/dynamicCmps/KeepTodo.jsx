export function KeepTodo({ keep }) {
  return (
    <div className="keep">
      <h4>{keep.info.title}</h4>
      {keep.info.todos.map((todo) => {
        return <p key={todo.txt}>{todo.txt}</p>;
      })}
    </div>
  );
}
