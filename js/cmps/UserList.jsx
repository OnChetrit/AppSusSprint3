import { UserPreview } from './UserPreview.jsx';

export function UserList({ users }) {
  return (
    <div className="user-list flex justify-center direction-col al-items-center">
      {users.map((user) => (
        <UserPreview key={user.id} user={user} />
      ))}
    </div>
  );
}