import { AppHeader } from '../cmps/AppHeader.jsx';
import { ComposeMail } from '../cmps/mail/ComposeMail.jsx';
import { MailDetails } from '../cmps/mail/MailDetails.jsx';
import { MailFilter } from '../cmps/mail/MailFilter.jsx';
import { MailList } from '../cmps/mail/MailList.jsx';
// import { mailService } from '../services/mail.service.js';
import { userService } from '../services/user.service.js';

export class Mail extends React.Component {
  state = {
    user: null,
    isCompose: false,
    searchBy: null,
    mails: null,
    filterBy: null,
    isMailOpen: false,
  };

  toggleMail;
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
  onRemoveMail = (mailId, mails, user) => {
    userService.removeMail(mailId, mails, user);
    this.loadUser();
  };

  onRestoreMail = (mailId, mails, user) => {
    userService.restoreMail(mailId, mails, user);
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
  onSetArchive = (user, mail) => {
    userService.setArchive(user, mail);
    this.loadMails(user, this.state.searchBy, this.state.filterBy);
  };

  onOpenMail = () => {
    this.toggleMail = !this.state.isMailOpen;
    this.setState({ isMailOpen: this.toggleMail });
  };

  onSetRead = (mail) => {
    userService.setRead(mail).then(() => {
      this.loadMails(this.state.user);
    });
  };
  render() {
    const { user, isCompose, mails, isMailOpen, onOpenMail } = this.state;
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
          {user && !isMailOpen && (
            <MailList
              onSetSearch={this.onSetSearch}
              mails={mails}
              user={user}
              onIsStared={this.onIsStared}
              onRemoveMail={this.onRemoveMail}
              onSetArchive={this.onSetArchive}
              onRestoreMail={this.onRestoreMail}
              onOpenMail={this.onOpenMail}
              onSetRead={this.onSetRead}
            />
          )}
          {user && isMailOpen && (
            <MailDetails
              onSetSearch={this.onSetSearch}
              mails={mails}
              user={user}
              onIsStared={this.onIsStared}
              onRemoveMail={this.onRemoveMail}
              onSetArchive={this.onSetArchive}
              onRestoreMail={this.onRestoreMail}
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
