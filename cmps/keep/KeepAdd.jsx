import { ImgInput } from './dynamicInputs/ImgInput.jsx';
import { TodoInput } from './dynamicInputs/TodoInput.jsx';
import { TxtInput } from './dynamicInputs/TxtInput.jsx';

export class KeepAdd extends React.Component {
  state = {
    type: 'txt',
    title: '',
    txt: '',
    // keep: {
    //   type: 'txt',
    //   info: { title: '', txt: '' },
    //   style: { color: '#ffffff' },
    // },
    isExpanded: false,
  };

  // inputRef = React.createRef();

  // componentDidMount() {
  //   this.inputRef.current.focus();
  // }

  onExpand = (isExpanded) => {
    this.setState({ isExpanded });
  };

  onChangeInputType = (val) => {
    console.log(`value`, val);
    this.setState({ type: val });
    this.onExpand(true);
  };

  onAddKeep = () => {
    const { type, title, txt } = this.state;
    if (!type || !txt) return;
    console.log(`type,val`, type, title, txt);
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
    console.log(`val, field`, val, field);
    this.setState({ [field]: val });
  };

  // handleChange = ({ target }) => {
  //   console.log(`from KeepAdd target`, target);
  //   const field = target.name;
  //   const value = target.value;
  //   console.log(`value, field`, value, field);
  //   this.setState((prevState) => ({
  //     keep: {
  //       ...prevState.keep,
  //       info: { ...prevState.info, [field]: value },
  //     },
  //   }));
  // };

  render() {
    const { isExpanded } = this.state;
    return (
      <div className="add-keep flex">
        <div className="">
          <button
            className="txt btn reset-btn"
            onClick={() => this.onChangeInputType('txt')}
          >
            <img src="../img/keep/text.svg" />
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
            <form onSubmit={this.onAddKeep}>
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
                placeholder="txt"
                value={this.state.txt}
                onChange={this.handleChange}
              />
              <button className="add" onClick={() => this.onAddKeep()}>
                Add
              </button>
              <button className="close" onClick={() => this.onExpand()}>
                close
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

// <DynamicInputs
//   type={type}
//   handleChange={this.handleChange}
//   onExpand={this.onExpand}
//   onAddKeep={this.onAddKeep}
//   keep={keep}
// />
