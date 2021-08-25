import { UserList } from '../cmps/UserList.jsx';
import { userService } from '../services/user.service.js';
import { Mail } from './Mail.jsx';

export class MainApp extends React.Component {
  state = {
    users: null,
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
    const { users } = this.state;
    if (!users) return <div>Loading...</div>;
    return (
      <section className="mail-app">
        <header>Logo</header>
        <UserList users={users} onGetUser={this.onGetUser} />
      </section>
    );
  }
}
