import { AppHeader } from '../cmps/AppHeader.jsx';
import { ComposeMail } from '../cmps/mail/ComposeMail.jsx';
import { MailFilter } from '../cmps/mail/MailFilter.jsx';
import { MailList } from '../cmps/mail/MailList.jsx';
import { userService } from '../services/user.service.js';

export class Mail extends React.Component {
  state = {
    user: null,
    isCompose: false,
    searchBy: null,
    mails: null,
  };

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
      this.loadMails(user);
      this.setState({ user });
    });
  };
  loadMails = (user, searchBy) => {
    if (!user) return;
    userService.queryMails(user, searchBy).then((mails) => {
      this.setState({ mails });
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

  onSetSearch = (searchBy) => {
    console.log('dsad', searchBy);
    this.setState({ searchBy });
    this.loadMails(this.state.user, searchBy);
  };

  render() {
    const { user, isCompose, mails } = this.state;
    if (!user) return <div className="">Loading...</div>;
    return (
      <div className="mail-app flex direction-col">
        <header>
          <AppHeader user={user} />
        </header>
        {/* <MailSearch onSetSearch={this.onSetSearch} /> */}
        <main className="flex">
          <MailFilter user={user} onToggleCompose={this.onToggleCompose} />
          {user && (
            <MailList
              onSetSearch={this.onSetSearch}
              mails={mails}
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
