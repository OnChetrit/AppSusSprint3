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
        <NavLink to="/">LogOut</NavLink>
        <NavLink to={`/user/${user.id}/keep`}>Keep</NavLink>
        <NavLink to={`/user/${user.id}/mail`}>mail</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    );
  }
}

export const AppHeader = withRouter(_AppHeader);
