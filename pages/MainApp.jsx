import { ImgSelect } from '../cmps/ImgSelect.jsx';
import { UserList } from '../cmps/UserList.jsx';
import { userService } from '../services/user.service.js';
import { Mail } from './Mail.jsx';

export class MainApp extends React.Component {
  state = {
    imgs: null,
    toggleImgs: false,
    users: null,
    isAddUser: false,
    style: {
      backgroundImage: 'url(img/background6.jpg)',
    },
  };

  toggleIsUser;

  componentDidMount() {
    this.loadUsers();
    this.loadImg();
  }

  onSwitchBackground = (num) => {
    let newBackground = `url(img/background${num}.jpg)`;
    this.setState({ style: { backgroundImage: newBackground } });
    this.onToggleImgContainer();
  };

  loadUsers = () => {
    userService.query().then((users) => {
      this.setState({ users });
    });
  };

  loadImg = () => {
    userService.queryImg().then((imgs) => {
      this.setState({ imgs });
    });
  };

  onToggleImgContainer = () => {
    this.setState((prevState) => ({ toggleImgs: !prevState.toggleImgs }));
  };

  onToggleAddUser = () => {
    this.toggleIsUser = !this.state.isAddUser;
    this.setState({ isAddUser: this.toggleIsUser });
  };

  render() {
    const { users, isAddUser, background, imgs, toggleImgs } = this.state;
    if (!users || !imgs) return <div>Loading...</div>;
    return (
      <section
        className="main-app flex justify-center al-items-center"
        style={this.state.style}
      >
        <UserList
          onToggleAddUser={this.onToggleAddUser}
          onToggleImgContainer={this.onToggleImgContainer}
          onSwitchBackground={this.onSwitchBackground}
          background={background}
          toggleImgs={toggleImgs}
          isAddUser={isAddUser}
          users={users}
        />
        {toggleImgs && (
          <ImgSelect
            onToggleImgContainer={this.onToggleImgContainer}
            onSwitchBackground={this.onSwitchBackground}
            toggleImgs={toggleImgs}
            imgs={imgs}
          />
        )}
      </section>
    );
  }
}
