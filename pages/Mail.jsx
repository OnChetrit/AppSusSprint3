import { MailList } from '../cmps/MailList.jsx';
import { userService } from '../services/user.service.js';

export class Mail extends React.Component {
  // ({ currUser, onIsStared })
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

  onIsStared = (user, mailId) => {
    userService.setStar(user, mailId);
    this.loadUser();
  };

  render() {
    const { user } = this.state;
    return (
      <div className="mail">
        <div className="mails-container">
          {user && (
            <MailList
              mails={user.mails}
              user={user}
              onIsStared={this.onIsStared}
            />
          )}
        </div>
      </div>
    );
  }
}
