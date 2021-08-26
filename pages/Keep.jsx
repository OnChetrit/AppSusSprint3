import { AppHeader } from '../cmps/AppHeader.jsx';
import { KeepFilter } from '../cmps/keep/KeepFilter.jsx';
import { KeepList } from '../cmps/keep/KeepList.jsx';
import { userService } from '../services/user.service.js';

export class Keep extends React.Component {
  state = {
    user: null,
    keeps: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.match.params.userId !== this.props.match.params.userId) {
  //     this.loadUser();
  //   }
  // }

  loadUser = () => {
    const id = this.props.match.params.userId;
    userService.getUserById(id).then((user) => {
      if (!user) this.props.history.push('/');
      this.setState({ user });
    });
  };

  onAdd = (type, title, txt) => {
    const { user } = this.state;
    userService.createKeep(user, type, title, txt).then(() => {
      this.loadUser();
    });
  };

  render() {
    const { user } = this.state;
    if (!user) return <div className="">Loading...</div>;
    return (
      <div className="keep-app flex direction-col">
        <header>
          <AppHeader user={user} />
        </header>
        <main className="flex">
          <KeepFilter />
          {user && (
            <KeepList onAdd={this.onAdd} keeps={user.keeps} user={user} />
          )}
        </main>
      </div>
    );
  }
}
