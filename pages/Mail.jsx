import { AppHeader } from '../cmps/AppHeader.jsx';
import { ComposeMail } from '../cmps/mail/ComposeMail.jsx';
import { MailFilter } from '../cmps/mail/MailFilter.jsx';
import { MailList } from '../cmps/mail/MailList.jsx';
import { mailService } from '../services/mail.service.js';
import { userService } from '../services/user.service.js';

export class Mail extends React.Component {
  state = {
    user: null,
    isCompose: false,
    searchBy: null,
    mails: null,
    filterBy: null,
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
      this.loadMails(user, this.state.searchBy, this.state.filterBy);
      this.setState({ user });
    });
  };
  loadMails = (user, searchBy, filterBy) => {
    if (!user) return;
    userService.queryMails(user, searchBy, filterBy).then((mails) => {
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
    this.setState({ searchBy }, () =>
      this.loadMails(this.state.user, searchBy, this.filterBy)
    );
  };

  onSetFilterBy = (filterBy) => {
    this.setState({ filterBy }, () =>
      this.loadMails(this.state.user, this.searchBy, filterBy)
    );
  };
  onSetSpam = (user, mail) => {
    userService.setSpam(user, mail);
    this.loadMails(user, this.state.searchBy, this.state.filterBy);
  };
  render() {
    const { user, isCompose, mails } = this.state;
    if (!user) return <div className="">Loading...</div>;
    return (
      <div className="mail-app flex direction-col">
        <header>
          <AppHeader user={user} />
        </header>
        <main className="flex">
          <MailFilter
            user={user}
            onSetFilterBy={this.onSetFilterBy}
            onToggleCompose={this.onToggleCompose}
          />
          {user && (
            <MailList
              onSetSearch={this.onSetSearch}
              mails={mails}
              user={user}
              onIsStared={this.onIsStared}
              onRemoveMail={this.onRemoveMail}
              onSetSpam={this.onSetSpam}
            />
          )}
          {isCompose && (
            <ComposeMail
              onComposeMail={this.onComposeMail}
              onToggleCompose={this.onToggleCompose}
            />
          )}
        </main>
      </div>
    );
  }
}
