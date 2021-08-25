import { UserList } from '../cmps/UserList.jsx';
import { userService } from '../services/user.service.js';
import { Mail } from './Mail.jsx';

export class MainApp extends React.Component {
  state = {
    users: null,
    // currUser: null,
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

  render() {
    const { users, currUser } = this.state;
    if (!users) return <div>Loading...</div>;
    return (
      <section className="mail-app">
        {!currUser && <UserList users={users} onGetUser={this.onGetUser} />}
        {/* {currUser && <Mail currUser={currUser} onIsStared={this.onIsStared} />} */}
      </section>
    );
  }
}
