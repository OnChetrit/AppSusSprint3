import { AppHeader } from '../cmps/AppHeader.jsx';
import { KeepList } from '../cmps/keep/KeepList.jsx';
import { userService } from '../services/user.service.js';

export class Keep extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.loadUser();
    }
  }

  loadUser = () => {
    const id = this.props.match.params.userId;
    console.log(`this.props.match`, this.props.match);
    userService.getUserById(id).then((user) => {
      if (!user) this.props.history.push('/');
      this.setState({ user });
    });
  };

  render() {
    const { user } = this.state;
    if (!user) return <div className="">Loading...</div>;
    return (
      <React.Fragment>
        <header>
          <AppHeader user={user} />
        </header>
        <div className="keep-app">
          <KeepList keep={user.notes} user={user} />
        </div>
      </React.Fragment>
    );
  }
}
