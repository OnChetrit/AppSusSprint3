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

  goBack = (ev) => {
    ev.preventDefault();
    this.props.history.push('/');
  };

  onAddUser = (ev) => {
    ev.preventDefault();
    userService.addUser(this.state.user);
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="add-user-container flex justify-center al-items-center direction-col">
        <div className="form flex direction-col al-items-center">
          <img src="img/add-user.png" />
          <form
            className="add-user flex direction-col justify-center"
            onSubmit={this.onAddUser}
          >
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
            <div className="actions">
              <button className="btn" onClick={this.goBack}>
                Go Back
              </button>
              <button className="btn register">Register</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
