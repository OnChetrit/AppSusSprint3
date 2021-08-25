import { ComposeMail } from '../cmps/mail/ComposeMail.jsx';
import { MailList } from '../cmps/mail/MailList.jsx';
import { userService } from '../services/user.service.js';

export class Mail extends React.Component {
  state = { user: null };

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

  render() {
    const { user } = this.state;
    return (
      <div className="mail-app">
        {user && (
          <MailList
            mails={user.mails}
            user={user}
            onIsStared={this.onIsStared}
          />
        )}
        <div className="">
          <ComposeMail onComposeMail={this.onComposeMail} />
          {/* <MailFilter /> */}
        </div>
      </div>
    );
  }
}
