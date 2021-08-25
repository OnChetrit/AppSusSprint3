import { userService } from '../services/user.service.js';
import { UserMail } from './UserMail.jsx';

export class MailApp extends React.Component {
  state = {
    users: null,
    currUser: null,
  };

  loadUsers = () => {
    userService.query().then((users) => {
      this.setState({ users });
    });
  };
  onGetUser = (userId) => {
    userService.getUserById(userId).then((currUser) => {
      this.setState({ currUser });
    });
  };

  render() {
    const { users, currUser } = this.state;
    if (!users) return <div>Loading...</div>;
    return (
      <section className="mail-app">
        <div className="user-list flex justify-center direction-col al-items-center">
          {users.map((user) => (
            <div
              className="user-card btn"
              onClick={() => {
                this.onGetUser(user.id);
              }}
            >
              <h4>{user.username}</h4>
              <p>{user.emailAddress}</p>
            </div>
          ))}
        </div>
        {currUser && <UserMail currUser={currUser} />}
      </section>
    );
  }
}
