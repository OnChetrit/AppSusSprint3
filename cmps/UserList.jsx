import { UserPreview } from './UserPreview.jsx';

const { Link } = ReactRouterDOM;

export function UserList({ users, onToggleImgContainer }) {
  return (
    <div className="user-list flex justify-center direction-col al-items-center">
      <img className="login-logo" src="../img/main-logo.png" />
      <h1>Choose an account</h1>
      {users.map((user) => (
        <UserPreview key={user.id} user={user} />
      ))}
      <Link to={`/user/create`} className="add-acount reset-link">
        <button className="btn">Add acount</button>{' '}
      </Link>
      <img
        onClick={(ev) => {
          ev.stopPropagation();
          onToggleImgContainer();
        }}
        className="edit btn"
        src="../img/edit.svg"
      />
    </div>
  );
}
