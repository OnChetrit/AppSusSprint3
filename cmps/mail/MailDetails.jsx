export function MailDetails({user, mail, onReplyMail, onForwardMail}) {
  if(!user) return <div>Load</div>;
  return <div className="mail-details">
    <div className="mail-details-card">
        <div className="img-user" style={{ backgroundColor: user.bgc }}>
          <h3>{user.username[0].toUpperCase()}</h3>
        </div>
        <div className="mail-details-content">
          <section className="mail-details-from">
          <h4>{mail.from}</h4>
          <p>{`<${mail.fromMail}>`}</p>
          </section>
          <h2>{mail.subject}</h2>
          <p>{mail.body}</p>
        </div>
    </div>
    <button className="replay-btn" onClick={() => {
      onReplyMail(mail)
    }}>Reply</button>
    <button className="replay-btn" onClick={() => {
      onForwardMail(mail)
    }}>Forward</button>
  </div>;
  
}
