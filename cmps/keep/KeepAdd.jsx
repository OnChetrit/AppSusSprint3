export class KeepAdd extends React.Component {
  state = {
    inputType: 'txt',
  };

  onChangeInputType = ({ target }) => {
    this.setState({ inputType: target.value });
  };

  render() {
    const { inputType } = this.state;
    const DynamicCmp = (props) => {
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
        <label htmlFor="title"></label>
        <input type="text" name="title" id="title" placeholder="title" />
        <DynamicCmp inputType={inputType} />
        <label htmlFor="txt"></label>
        <input type="text" name="txt" id="title" placeholder="txt" />
      </div>
    );
  }
}
