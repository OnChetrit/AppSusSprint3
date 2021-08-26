import { userService } from '../services/user.service.js';

export class CreatUser extends React.Component {
  state = {
    user: {
      username: '',
      emailAddress: '',
    },
  };
  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({
      user: { ...prevState.user, [field]: value },
    }));
  };

  onAddUser = (ev) => {
    ev.preventDefault();
    userService.addUser(this.state.user);
    this.props.history.push(`/user/${user.id}/mail`);
  };

  render() {
    return (
      <div>
        <form className="add-user" onSubmit={this.onAddUser}>
          <label htmlFor="username"></label>
          <input
            type="text"
            name="username"
            required
            id="username"
            required
            onChange={this.handleChange}
            placeholder="Your Full Name"
          />

          <label htmlFor="emailAddress"></label>
          <input
            type="text"
            name="emailAddress"
            id="emailAddress"
            required
            onChange={this.handleChange}
            placeholder="ex@email.com"
          />

          <button>Register</button>
        </form>
      </div>
    );
  }
}
