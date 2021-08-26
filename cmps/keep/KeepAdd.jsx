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

  onAddKeep = (ev) => {
    ev.preventDefault();
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
    // const { type } = keep;
    // const DynamicInputs = (props) => {
    //   switch (this.state.keep.type) {
    //     case 'txt':
    //       return <TxtInput {...props} />;
    //     case 'img':
    //       return <ImgInput {...props} />;
    //     case 'todo':
    //       return <TodoInput {...props} />;
    //     default:
    //       break;
    //   }
    // };
    return (
      <div className="add-keep">
        <button className="txt" onClick={() => this.onChangeInputType('txt')}>
          Add Keep
        </button>
        <button className="todo" onClick={() => this.onChangeInputType('todo')}>
          Add Todo
        </button>
        <button className="img" onClick={() => this.onChangeInputType('img')}>
          Add Image
        </button>
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
              <button className="add" onClick={() => this.onAddKeep(event)}>
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
