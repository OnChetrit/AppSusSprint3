export class KeepAdd extends React.Component {
  state = {
    type: 'txt',
    title: '',
    txt: '',
    isExpanded: false,
    todoInputsCount: 0,
  };

  // inputRef = React.createRef();

  // componentDidMount() {
  //   this.inputRef.current.focus();
  // }

  onExpand = (isExpanded) => {
    this.setState({ isExpanded });
  };

  onChangeInputType = (val) => {
    this.setState({ type: val });
    this.onExpand(true);
  };

  onAddKeep = () => {
    const { type, title, txt } = this.state;
    if (!type || !txt) return;
    this.props.onAdd(type, title, txt);
    this.setState({
      type: 'txt',
      title: '',
      txt: '',
      isExpanded: false,
    });
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const val = target.value;
    this.setState({ [field]: val });
  };

  render() {
    const { isExpanded, type } = this.state;
    return (
      <div className="add-keep flex direction-col">
        <div className="flex space-evenly">
          <button
            className="txt btn reset-btn"
            onClick={() => this.onChangeInputType('txt')}
          >
            <img src="img/keep/text.svg" />
          </button>
          <button
            className="todo btn reset-btn"
            onClick={() => this.onChangeInputType('todo')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
              <path d="m18 9-1.4-1.4-6.6 6.6-2.6-2.6L6 13l4 4z" />
            </svg>
          </button>
          <button
            className="img btn reset-btn"
            onClick={() => this.onChangeInputType('img')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7-3 3.72L9 13l-3 4h12l-4-5z" />
            </svg>
          </button>
        </div>
        {isExpanded && (
          <div className="add-todo">
            <form onSubmit={this.onAddKeep} className="flex direction-col">
              <label htmlFor="title"></label>
              <input
                // ref={this.inputRef}
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <label htmlFor="txt"></label>
              <input
                type="text"
                name="txt"
                id="txt"
                placeholder={
                  type === 'txt' ? `Text` : type === 'img' ? 'URL' : 'To Do'
                }
                value={this.state.txt}
                onChange={this.handleChange}
              />
              {type === 'todo' && (
                <div className="">
                  <label htmlFor="todo"></label>
                  <input
                    type="text"
                    name="todo"
                    id="todo"
                    placeholder="To Do"
                    value={this.state.txt}
                    onChange={this.handleChange}
                  />
                  <button>+</button>
                </div>
              )}
              <div className="add-keep-actions flex space-evenly">
                <button
                  className="add btn reset-btn"
                  onClick={() => this.onAddKeep()}
                >
                  Add
                </button>
                <button
                  className="close btn reset-btn"
                  onClick={() => this.onExpand()}
                >
                  close
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}
