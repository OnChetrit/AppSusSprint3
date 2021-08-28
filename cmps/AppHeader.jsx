const { NavLink, withRouter } = ReactRouterDOM;

class _AppHeader extends React.Component {
  state = {};
  render() {
    const { user } = this.props;
    const logo = this.props.match.path === '/user/:userId/mail' ? './img/our-logo.png' : this.props.match.path === '/user/:userId/keep' ? './img/keep-react.png' : this.props.match.path === '/book' ?'./img/book-react.png' : ''
    return (
      <nav className="app-header flex al-items-center">
        <img src={logo}/>
        <NavLink to="/">LogOut</NavLink>
        <NavLink to={`/user/${user.id}/keep`}>Keep</NavLink>
        <NavLink to={`/user/${user.id}/mail`}>mail</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    );
  }
}

export const AppHeader = withRouter(_AppHeader);
