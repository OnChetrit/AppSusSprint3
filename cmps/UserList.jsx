import { UserPreview } from './UserPreview.jsx';

const { Link } = ReactRouterDOM;

export function UserList({ users }) {
  return (
    <div className="user-list flex justify-center direction-col al-items-center">
      <img src="../img/main-logo.png" />
      <h1>Choose an account</h1>
      {users.map((user) => (
        <UserPreview key={user.id} user={user} />
      ))}
      <Link to={`/user/create`} className="reset-link">
        <button className="btn">Add acount</button>{' '}
      </Link>
    </div>
  );
}
