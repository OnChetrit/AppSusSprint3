import { mailService } from '../../services/mail.service.js';
import { userService } from '../../services/user.service.js';

export function MailDetails({ user, mail, onReplyMail, onForwardMail }) {

  if (!user) return <div>Load</div>;
  mail.isRead = true;
  return (
    <div className="mail-details">
      <div className="mail-details-card">
        <div className="img-user" style={{ backgroundColor: user.bgc }}>
          <h3>{user.username[0].toUpperCase()}</h3>
        </div>
        <div className="mail-details-content">
          <section className="mail-details-from">
            <h4>{mail.from}</h4>
            <p>{`<${mail.fromMail}>`}</p>
            <p>{userService.timeSendDetails(mail.sentAt)}</p>
          </section>
            <p>to: {user.emailAddress}</p>
          <h2>{mail.subject}</h2>
          <p>{mail.body}</p>
        </div>
      </div>
      <button
        className="replay-btn btn"
        onClick={() => {
          onReplyMail(mail);
        }}
      >
        Reply
      </button>
      <button
        className="replay-btn btn"
        onClick={() => {
          onForwardMail(mail);
        }}
      >
        Forward
      </button>
    </div>
  );
}
