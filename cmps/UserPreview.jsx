const { Link } = ReactRouterDOM;

export function UserPreview({ user }) {
  return (
    <Link to={`/user/${user.id}/mail`} className="reset-link">
      <div key={user.id} className="user-card flex al-items-center btn">
        <div className="img-user" style={{ backgroundColor: user.bgc }}>
          <h3>{user.username[0].toUpperCase()}</h3>
        </div>
        <div className="">
          <h4>{user.username}</h4>
          <p>{user.emailAddress}</p>
        </div>
      </div>
    </Link>
  );
}
