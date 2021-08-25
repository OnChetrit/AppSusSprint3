export function UserMail({ currUser }) {
  const mails = currUser.mails;
  return (
    <div className="user-mail">
      <div className="mails-container">
        {mails.map((mail) => (
          <div key={mail.id} className="mail-card">
            <h1>{mail.subject}</h1>
            <h1>{mail.body}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
