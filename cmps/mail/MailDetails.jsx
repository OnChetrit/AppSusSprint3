export function MailDetails({user, mail}) {
  if(!user) return <div>Load</div>;
  console.log(mail);
  return <div className="mail-details">
    <div className="mail-details-card">
        <div className="img-user" style={{ backgroundColor: user.bgc }}>
          <h3>{user.username[0].toUpperCase()}</h3>
        </div>
          <h1>{mail.from}</h1>
          <h1>{mail.fromMail}</h1>
          <h1>{mail.subject}</h1>
          <h1>{mail.body}</h1>
    </div>
  </div>;
}
