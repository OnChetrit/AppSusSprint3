import { AppHeader } from '../cmps/AppHeader.jsx';
import { ComposeMail } from '../cmps/mail/ComposeMail.jsx';
import { MailDetails } from '../cmps/mail/MailDetails.jsx';
import { MailFilter } from '../cmps/mail/MailFilter.jsx';
import { MailList } from '../cmps/mail/MailList.jsx';
import { eventBusService } from '../services/event-bus-service.js';
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
    mail: null,
    replyMail: null,
    forwardMail: null,
    isTrash: false,
    sortedBy: null,
    draftMail: null,
    draftInterval: null,
    unreadMails: null,
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
  loadMails = (user, searchBy, filterBy, sortedBy) => {
    if (!user) return;
    userService.queryMails(user, searchBy, filterBy, sortedBy).then((mails) => {
      this.setState({ mails });
      userService.getUnReadMails(mails).then((unreadMails) => {
        this.setState({ unreadMails });
      });
    });
  };
  loadMail = (mail) => {
    this.setState({ mail });
  };
  onComposeMail = (mail) => {
    userService.composeMail(this.state.user, mail);
    eventBusService.emit('user-msg', { txt: 'Mail Sent!', type: 'success' });
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
    eventBusService.emit('user-msg', {
      txt: 'Conversation moved to Trash.',
      type: '',
    });
    this.loadUser();
  };
  onRestoreMail = (mailId, mails, user) => {
    userService.restoreMail(mailId, mails, user);
    this.loadUser();
  };
  onSetSearch = (searchBy) => {
    this.setState({ searchBy }, () => {
      this.setState({ mail: null });
      this.loadMails(
        this.state.user,
        searchBy,
        this.filterBy,
        this.state.sortedBy
      );
    });
  };
  onSetFilterBy = (filterBy) => {
    this.setState({ filterBy }, () => {
      this.setState({ mail: null });
      this.loadMails(
        this.state.user,
        this.state.searchBy,
        filterBy,
        this.state.sortedBy
      );
    });
  };
  onSetSortedBy = (sortedBy) => {
    console.log('hi', sortedBy);
    this.setState({ sortedBy }, () => {
      this.setState({ mail: null });
      this.loadMails(
        this.state.user,
        this.state.searchBy,
        this.state.filterBy,
        sortedBy
      );
    });
  };
  onSetArchive = (user, mail) => {
    userService.setArchive(user, mail);
    this.loadMails(user, this.state.searchBy, this.state.filterBy);
  };
  onOpenMail = (mail) => {
    this.setState({ mail });
  };
  onSetRead = (mail) => {
    let msg = mail.isRead ? 'unread' : 'read';
    userService.setRead(mail).then(() => {
      this.loadMails(this.state.user);
    });
    eventBusService.emit('user-msg', {
      txt: 'Conversation marked as ',
      type: msg,
    });
  };
  onReplyMail = (replyMail) => {
    this.onToggleCompose();
    this.setState({ replyMail });
  };
  onForwardMail = (forwardMail) => {
    console.log(forwardMail);
    this.onToggleCompose();
    this.setState({ forwardMail });
  };
  onDraftMail = (mailToDraft) => {
    userService.setDraft(this.state.user, mailToDraft);
  };
  onSelectMail = (mail) => {
    userService.setSelectedMail(mail);
    this.loadMails(
      this.state.user,
      this.state.searchBy,
      this.state.filterBy,
      this.state.sortedBy
    );
  };
  onRemoveSelected = () => {
    userService.removeSelectedMail(this.state.mails, this.state.user);
    this.loadMails(
      this.state.user,
      this.state.searchBy,
      this.state.filterBy,
      this.state.sortedBy
    );
  };
  onSelectedArchive = () => {
    userService.moveSelectedToArchive(this.state.mails, this.state.user);
    this.loadMails(
      this.state.user,
      this.state.searchBy,
      this.state.filterBy,
      this.state.sortedBy
    );
  };
  onSetSelectedRead = () => {
    userService.selectedRead(this.state.mails, this.state.user);
    this.loadMails(
      this.state.user,
      this.state.searchBy,
      this.state.filterBy,
      this.state.sortedBy
    );
  };
  onRestoreSelected = () => {
    userService.restoreSelectedMail(this.state.mails, this.state.user);
    this.loadMails(
      this.state.user,
      this.state.searchBy,
      this.state.filterBy,
      this.state.sortedBy
    );
  };

  render() {
    const {
      user,
      isCompose,
      mails,
      mail,
      replyMail,
      forwardMail,
      draftInterval,
      unreadMails,
    } = this.state;
    if (!user) return <div className="">Loading...</div>;
    return (
      <div className="mail-app flex direction-col">
        <header>
          <AppHeader user={user} />
        </header>
        <main className="flex">
          <MailFilter
            user={user}
            unreadMails={unreadMails}
            onSetFilterBy={this.onSetFilterBy}
            onToggleCompose={this.onToggleCompose}
          />
          {user && !mail && (
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
              onSetSortedBy={this.onSetSortedBy}
              onSelectMail={this.onSelectMail}
              onRemoveSelected={this.onRemoveSelected}
              onSelectedArchive={this.onSelectedArchive}
              onSetSelectedRead={this.onSetSelectedRead}
              onRestoreSelected={this.onRestoreSelected}
            />
          )}
          {mail && (
            <MailDetails
              onSetSearch={this.onSetSearch}
              mails={mails}
              mail={mail}
              user={user}
              onIsStared={this.onIsStared}
              onRemoveMail={this.onRemoveMail}
              onSetArchive={this.onSetArchive}
              onRestoreMail={this.onRestoreMail}
              onReplyMail={this.onReplyMail}
              onForwardMail={this.onForwardMail}
            />
          )}

          {isCompose && (
            <ComposeMail
              mail={mail}
              user={user}
              replyMail={replyMail}
              forwardMail={forwardMail}
              onComposeMail={this.onComposeMail}
              onToggleCompose={this.onToggleCompose}
              onDraftMail={this.onDraftMail}
            />
          )}
        </main>
      </div>
    );
  }
}
