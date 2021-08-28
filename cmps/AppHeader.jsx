const { NavLink, withRouter } = ReactRouterDOM;

class _AppHeader extends React.Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <nav className="flex al-items-center">
        {/* <NavLink activeClassName="my-active" exact to="/">
          Home
        </NavLink> */}
        <NavLink to="/">
          <div className="img-user" style={{ backgroundColor: user.bgc }}>
            <h3>{user.username[0].toUpperCase()}</h3>
          </div>
        </NavLink>
        <NavLink to={`/user/${user.id}/mail`}>Mail</NavLink>
        <NavLink to={`/user/${user.id}/keep`}>Keep</NavLink>
        <NavLink to={`/book`}>Book</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    );
  }
}

export const AppHeader = withRouter(_AppHeader);
