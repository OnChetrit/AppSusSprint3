export function ImgInput({ onExpand, handleChange }) {
  return (
    <div className="add-todo">
      <label htmlFor="title"></label>
      <input type="text" name="title" id="title" placeholder="title" />
      <label htmlFor="txt"></label>
      <input type="text" name="txt" id="title" placeholder="URL" />
      <button className="add" onClick={() => onAddKeep()}>
        Add
      </button>
      <button className="close" onClick={() => onExpand()}>
        close
      </button>
    </div>
  );
}
