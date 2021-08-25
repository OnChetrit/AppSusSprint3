export function KeepTodo({keep}) {
    return (
        <div className="keep-todo">
           <h1>{keep.info.label}</h1>
           {keep.info.todos.map(todo => {
               <h2>{todo.txt}</h2>
           })}
        </div>
    )
}