import { userService } from '../services/user.service.js';
import { utilService } from '../services/util.service.js';
import { UserMail } from './UserMail.jsx';

export class MailApp extends React.Component {
  state = {
    users: null,
    currUser: null,
  };
  componentDidMount() {
      this.loadUsers();
  }

  componentDidMount() {
    this.loadUsers();
  }

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
          {!currUser && 
        <div className="user-list flex justify-center direction-col al-items-center">
            <h1>Adir & On mail! logo</h1>
            <h1>Choose an account</h1>
          {users.map((user) => (
            <div
              key={user.id}
              className="user-card flex al-items-center btn"
              onClick={() => {
                this.onGetUser(user.id);
              }}
            >
              <div className="img-user" style={{ backgroundColor: user.bgc }}>
                <h3>{user.username[0].toUpperCase()}</h3>
              </div>
              <div className="">
                <h4>{user.username}</h4>
                <p>{user.emailAddress}</p>
              </div>
            </div>
          ))}
        </div>
          }
        {currUser && <UserMail currUser={currUser} />}
      </section>
    );
  }
}
