import { ImgInput } from './dynamicInputs/ImgInput.jsx';
import { TodoInput } from './dynamicInputs/TodoInput.jsx';
import { TxtInput } from './dynamicInputs/TxtInput.jsx';

export class KeepAdd extends React.Component {
  state = {
    keep: {
      inputType: 'txt',
      info: { title: '', txt: '' },
      style: { color: '#ffffff' },
    },
    isExpanded: false,
  };

  onExpand = (isExpanded) => {
    this.setState({ isExpanded });
  };

  onChangeInputType = (value) => {
    console.log(`value`, value);
    this.setState((prevState) => ({
      keep: { ...prevState.keep, inputType: value },
    }));
    this.onExpand(true);
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    console.log(`value, field`, value, field);
    this.setState((prevState) => ({
      keep: {
        ...prevState.keep,
        info: { ...prevState.keep.info, [field]: value },
      },
    }));
  };

  onAddKeep = () => {
    const { keep } = this.state;
    this.props.onAdd(keep);
    this.setState({
      keep: {
        inputType: 'txt',
        info: { title: '', txt: '' },
        style: { color: '#ffffff' },
      },
      isExpanded: false,
    });
  };

  render() {
    const { isExpanded, keep } = this.state;
    const { inputType } = keep;
    const DynamicInputs = (props) => {
      switch (props.type) {
        case 'txt':
          return <TxtInput {...props} />;
        case 'img':
          return <ImgInput {...props} />;
        case 'todo':
          return <TodoInput {...props} />;
        default:
          break;
      }
    };
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
          <DynamicInputs
            type={inputType}
            handleChange={this.handleChange}
            onExpand={this.onExpand}
            onAddKeep={this.onAddKeep}
            keep={keep}
          />
        )}
      </div>
    );
  }
}
