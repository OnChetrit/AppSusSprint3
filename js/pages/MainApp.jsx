import { UserList } from '../cmps/UserList.jsx';
import { userService } from '../services/user.service.js';
import { utilService } from '../services/util.service.js';
import { UserMail } from './UserMail.jsx';

export class MainApp extends React.Component {
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
        <UserList users={users} />

        {currUser && <UserMail currUser={currUser} />}
      </section>
    );
  }
}