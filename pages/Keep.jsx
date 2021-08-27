import { AppHeader } from '../cmps/AppHeader.jsx';
import { KeepAdd } from '../cmps/keep/KeepAdd.jsx';
import { KeepFilter } from '../cmps/keep/KeepFilter.jsx';
import { KeepList } from '../cmps/keep/KeepList.jsx';
import { eventBusService } from '../services/event-bus-service.js';
import { userService } from '../services/user.service.js';
import { ComposeMail } from '../cmps/mail/ComposeMail.jsx';

export class Keep extends React.Component {
  state = {
    user: null,
    keeps: null,
    pinnedKeep: null,
    unPinnedKeep: null,
    updateKeep: null,
    keepToMail: null,
  };

  componentDidMount() {
    this.loadUser();
    // this.loadKeeps();
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
      this.loadKeeps(user);
    });
  };

  loadKeeps = (user) => {
    console.log(`user`, user);
    if (!user) return;
    userService.queryKeeps(user).then((keeps) => {
      console.log(`keeps`, keeps);
      userService.queryPin(keeps).then((notes) => {
        console.log(`keeps`, notes);
        this.setState({ pinnedKeep: notes.pin, unPinnedKeep: notes.unpin });

        // this.setState({ keeps });
      });
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
    eventBusService.emit('user-msg', { txt: 'Keep remove!', type: '' });
  };

  onDuplicateKeep = (keep) => {
    const { user } = this.state;
    userService.duplicateKeep(user, keep).then(() => {
      this.loadUser();
    });
    eventBusService.emit('user-msg', { txt: 'Keep duplicated!', type: '' });
  };

  onPinKeep = (keep) => {
    userService.togglePin(keep);
    this.loadKeeps(this.state.user);
  };

  setSendMail = (keep) => {
    userService.sendMail(this.state.user, keep).then((keepToMail) => {
      this.setState({ keepToMail });
    });
  };

  onAdd = (type, title, txt) => {
    const { user } = this.state;
    userService.createKeep(user, type, title, txt).then(() => {
      this.loadUser();
    });
  };

  render() {
    const { user, pinnedKeep, unPinnedKeep, keepToMail } = this.state;
    console.log(`unPinnedKeep`, unPinnedKeep);
    if (!user) return <div className="">Loading...</div>;
    return (
      <div className="keep-app flex direction-col">
        <header>
          <AppHeader user={user} />
        </header>
        <main className="flex direction-col">
          <KeepFilter />
          <div className="add-keep-container flex direction-col al-items-center">
            <KeepAdd onAdd={this.onAdd} />
          </div>
          {user && (
            <div className="keep-list-container">
              <div className="pinned-keep">
                <h1>Pinned</h1>
                {pinnedKeep && (
                  <KeepList
                    onKeepColorChange={this.onKeepColorChange}
                    onDuplicateKeep={this.onDuplicateKeep}
                    onRemoveKeep={this.onRemoveKeep}
                    setSendMail={this.setSendMail}
                    onPinKeep={this.onPinKeep}
                    keeps={pinnedKeep}
                    user={user}
                  />
                )}
              </div>
              <div className="unpinned-keep">
                <h1>UnPinned</h1>
                {unPinnedKeep && (
                  <KeepList
                    onKeepColorChange={this.onKeepColorChange}
                    onDuplicateKeep={this.onDuplicateKeep}
                    onRemoveKeep={this.onRemoveKeep}
                    onPinKeep={this.onPinKeep}
                    setSendMail={this.setSendMail}
                    keeps={unPinnedKeep}
                    user={user}
                  />
                )}
              </div>
            </div>
          )}
        </main>
        {keepToMail && <ComposeMail keepToMail={keepToMail} user={user} />}
      </div>
    );
  }
}
