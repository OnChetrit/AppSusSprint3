const { NavLink, withRouter } = ReactRouterDOM;

class _AppHeader extends React.Component {
  state = {};
  render() {
    return (
      <nav className="flex align-center">
        <NavLink activeClassName="my-active" exact to="/">
          Home
        </NavLink>
        {/* <NavLink to="/book">Mails</NavLink> */}
        {/* <NavLink to="/about">About</NavLink> */}
      </nav>
    );
  }
}

export const AppHeader = withRouter(_AppHeader);
