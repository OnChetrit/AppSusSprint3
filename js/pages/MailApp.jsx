import { userService } from '../services/user.service.js';

export class MailApp extends React.Component {
  state = {
    users: null,
    currUser: null,
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    userService.query().then((users) => {
      this.setState({ users });
    });
  };

  render() {
    const { users, currUser } = this.state;
    if (!users) return <div>Loading...</div>;
    return (
      <section className="mail-app">
        <div className="user-list flex justify-center direction-col al-items-center">
          {users.map((user) => (
            <div key={user.id} className="user-card btn">
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
