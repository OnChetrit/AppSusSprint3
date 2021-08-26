export function TxtInput({ onExpand, onAddKeep, handleChange, keep }) {
  return (
    <div className="add-todo">
      <label htmlFor="title"></label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        value={keep.info.title}
        onChange={handleChange}
      />
      <label htmlFor="txt"></label>
      <input
        type="text"
        name="txt"
        id="txt"
        placeholder="txt"
        value={keep.info.txt}
        onChange={handleChange}
      />
      <button className="add" onClick={() => onAddKeep()}>
        Add
      </button>
      <button className="close" onClick={() => onExpand()}>
        close
      </button>
    </div>
  );
}
