import { UserList } from '../cmps/UserList.jsx';
import { userService } from '../services/user.service.js';
import { UserMail } from './UserMail.jsx';

export class MainApp extends React.Component {
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

  onIsStared = (user, mailId) => {
    userService.setStar(user, mailId)
  }

  render() {
    const { users, currUser } = this.state;
    if (!users) return <div>Loading...</div>;
    return (
      <section className="mail-app">
        {!currUser && <UserList users={users} onGetUser={this.onGetUser} />}
        {currUser && <UserMail currUser={currUser} onIsStared={this.onIsStared}/>}
      </section>
    );
  }
}
