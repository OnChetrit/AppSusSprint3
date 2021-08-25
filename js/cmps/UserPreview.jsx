export function UserPreview({ user }) {
  return (
    <div
      key={user.id}
      className="user-card flex al-items-center btn"
      onClick={() => {
        this.onGetUser(user.id);
      }}
    >
      <div className="img-user" style={{ backgroundColor: user.bgc }}>
        <h3>{user.username[0].toUpperCase()}</h3>
      </div>
      <div className="">
        <h4>{user.username}</h4>
        <p>{user.emailAddress}</p>
      </div>
    </div>
  );
}
