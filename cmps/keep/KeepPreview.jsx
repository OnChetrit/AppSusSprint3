import { KeepTxt } from '../keep/dynamicCmps/KeepTxt.jsx';
import { KeepTodo } from '../keep/dynamicCmps/KeepTodo.jsx';
import { KeepImg } from '../keep/dynamicCmps/KeepImg.jsx';
import { userService } from '../../services/user.service.js';

export class KeepPreview extends React.Component {
  state = { keep: this.props.keep };

  onCheckTodo = (todoId) => {
    const { keep } = this.state;
    userService.toggleTodo(keep, todoId);
    this.loadKeep();
  };

  onDeleteTodo = (todoId) => {
    const { keep } = this.state;
    userService.deleteTodo(keep, todoId).then(() => {
      this.loadKeep();
    });
  };

  loadKeep = () => {
    userService.queryKeep(this.props.user, this.state.keep.id).then((keep) => {
      this.setState({ keep });
    });
  };

  render() {
    const {
      onKeepColorChange,
      onDuplicateKeep,
      onRemoveKeep,
      setSendMail,
      onPinKeep,
      keep,
    } = this.props;

    const DynamicKeep = (props) => {
      switch (props.keep.type) {
        case 'txt':
          return <KeepTxt {...props} />;
        case 'todo':
          return <KeepTodo {...props} />;
        case 'img':
          return <KeepImg {...props} />;
      }
    };
    return (
      <DynamicKeep
        onKeepColorChange={onKeepColorChange}
        onDeleteTodo={this.onDeleteTodo}
        onDuplicateKeep={onDuplicateKeep}
        onCheckTodo={this.onCheckTodo}
        onRemoveKeep={onRemoveKeep}
        setSendMail={setSendMail}
        onPinKeep={onPinKeep}
        keep={keep}
      />
    );
  }
}
