import { UserList } from '../cmps/UserList.jsx';
import { userService } from '../services/user.service.js';
import { Mail } from './Mail.jsx';

export class MainApp extends React.Component {
  state = {
    users: null,
    isAddUser: false,
  };

  toggleIsUser;

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    userService.query().then((users) => {
      this.setState({ users });
    });
  };

  onToggleAddUser = () => {
    this.toggleIsUser = !this.state.isAddUser;
    this.setState({ isAddUser: this.toggleIsUser });
  };
  // this.setState((prevState) => ({
  //   keep: { ...prevState.keep, inputType: value },
  // }));

  render() {
    const { users, isAddUser } = this.state;
    if (!users) return <div>Loading...</div>;
    return (
      <section className="main-app flex justify-center al-items-center">
        <UserList
          users={users}
          onGetUser={this.onGetUser}
          isAddUser={isAddUser}
          onToggleAddUser={this.onToggleAddUser}
        />
      </section>
    );
  }
}
