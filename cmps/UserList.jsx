import { CreatUser } from '../pages/CreateUser.jsx';
import { UserPreview } from './UserPreview.jsx';

const { Link } = ReactRouterDOM;

export function UserList({ users, isAddUser, onToggleAddUser }) {
  return (
    <div className="user-list flex justify-center direction-col al-items-center">
      {isAddUser && <CreatUser />}
      {!isAddUser && (
        <div className="">
          <h1>Choose an account</h1>
          {users.map((user) => (
            <UserPreview key={user.id} user={user} />
          ))}
          <button onClick={onToggleAddUser}>Create Acount</button>
        </div>
      )}
    </div>
  );
}
