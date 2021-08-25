import { AppHeader } from '../cmps/AppHeader.jsx';
import { ComposeMail } from '../cmps/mail/ComposeMail.jsx';
import { MailFilter } from '../cmps/mail/MailFilter.jsx';
import { MailList } from '../cmps/mail/MailList.jsx';
import { userService } from '../services/user.service.js';

export class Mail extends React.Component {
  state = { user: null, isCompose: false };

  toggleMsg;

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.loadUser();
    }
  }

  loadUser = () => {
    const id = this.props.match.params.userId;
    userService.getUserById(id).then((user) => {
      if (!user) this.props.history.push('/');
      this.setState({ user });
    });
  };

  onComposeMail = (mail) => {
    userService.composeMail(this.state.user, mail);
  };

  onIsStared = (user, mailId) => {
    userService.setStar(user, mailId);
    this.loadUser();
  };

  onToggleCompose = () => {
    this.toggleMsg = !this.state.isCompose;
    this.setState({ isCompose: this.toggleMsg });
  };

  onRemoveMail = (user, mailId) => {
    userService.removeMail(user, mailId);
    this.loadUser();
  };

  render() {
    const { user, isCompose } = this.state;
    if (!user) return <div className="">Loading...</div>;
    return (
      <div className="mail-app flex direction-col">
        <header>
          <AppHeader user={user} />
        </header>
        <main className="flex">
          <MailFilter user={user} onToggleCompose={this.onToggleCompose} />
          {user && (
            <MailList
              mails={user.mails}
              user={user}
              onIsStared={this.onIsStared}
              onRemoveMail={this.onRemoveMail}
            />
          )}
          {isCompose && <ComposeMail onComposeMail={this.onComposeMail} />}
        </main>
      </div>
    );
  }
}
