import { AppHeader } from '../cmps/AppHeader.jsx';
import { KeepFilter } from '../cmps/keep/KeepFilter.jsx';
import { KeepList } from '../cmps/keep/KeepList.jsx';
import { eventBusService } from '../services/event-bus-service.js';
import { userService } from '../services/user.service.js';

export class Keep extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.match.params.userId !== this.props.match.params.userId) {
  //     this.loadUser();
  //   }
  // }

  loadUser = () => {
    const id = this.props.match.params.userId;
    userService.getUserById(id).then((user) => {
      if (!user) this.props.history.push('/');
      this.setState({ user });
    });
  };

  onKeepColorChange = (id, color) => {
    const { user } = this.state;
    userService.keepColorChange(user, id, color).then(() => {
      this.loadUser();
    });
  };

  onRemoveKeep = (id) => {
    const { user } = this.state;
    userService.removeKeep(user, id).then(() => {
      this.loadUser();
    });
    eventBusService.emit('user-msg', { txt: 'Keep deleted!', type: 'danger' });
  };

  onDuplicateKeep = (keep) => {
    const { user } = this.state;
    userService.duplicateKeep(user, keep).then(() => {
      this.loadUser();
    });
  };

  onAdd = (type, title, txt) => {
    const { user } = this.state;
    userService.createKeep(user, type, title, txt).then(() => {
      this.loadUser();
    });
  };

  render() {
    const { user } = this.state;
    if (!user) return <div className="">Loading...</div>;
    return (
      <div className="keep-app flex direction-col">
        <header>
          <AppHeader user={user} />
        </header>
        <main className="flex">
          <KeepFilter />
          {user && (
            <KeepList
              onAdd={this.onAdd}
              onKeepColorChange={this.onKeepColorChange}
              onRemoveKeep={this.onRemoveKeep}
              onDuplicateKeep={this.onDuplicateKeep}
              keeps={user.keeps}
              user={user}
            />
          )}
        </main>
      </div>
    );
  }
}
