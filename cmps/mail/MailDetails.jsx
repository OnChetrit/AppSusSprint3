import { mailService } from '../../services/mail.service.js';
import { userService } from '../../services/user.service.js';

export function MailDetails({
  user,
  mail,
  mails,
  onReplyMail,
  onForwardMail,
  onGoBack,
  onIsStared,
  onRemoveMail,
  onSetArchive,
}) {
  if (!user) return <div>Load</div>;
  mail.isRead = true;
  return (
    <div className="mail-details">
      <div>
        <div className="mail-details-btn" title="Back to mail list">
          <button
            className="btn back-btn"
            onClick={() => {
              onGoBack();
            }}
          >
            <img src="img/go-back.png" />
          </button>

          <div
            title={mail.isStared ? 'Starred' : 'Not starred'}
            className="btn star-icon"
            title="Star"
            onClick={(ev) => {
              ev.stopPropagation();
              onIsStared(user.id, mail.id);
            }}
          >
            <i
              className={
                mail.isStared ? 'fa fa-star star gold' : 'fa fa-star-o star'
              }
              aria-hidden="true"
            ></i>
          </div>
          <button
            title="Remove mail"
            className={`btn remove-details-btn ${mail.isArchive ? 'hide' : ''}`}
            onClick={(ev) => {
              ev.stopPropagation();
              onRemoveMail(mail.id, mails, user);
              onGoBack();
            }}
          >
            <div className="">
              <img src="img/mail/trash-filter.png" />
            </div>
          </button>
          <button
            title="Important"
            className="btn remove-details-btn reset-btn spam-mail"
            onClick={(ev) => {
              ev.stopPropagation();
              onSetArchive(user, mail);
              onGoBack();
            }}
          >
            <div className="">
              <img src="img/mail/archive-filter.png" />
            </div>
          </button>
        </div>
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
            <p className="mail-details-body">{mail.body}</p>
          </div>
        </div>
      </div>
      <div className="mail-details-actions flex">
        <button
          className="action-details-btn btn flex al-items-center space-between"
          onClick={() => {
            onReplyMail(mail);
          }}
        >
          <img src="img/mail/reply.png" />
          Reply
        </button>
        <button
          className="action-details-btn btn flex al-items-center space-between"
          onClick={() => {
            onForwardMail(mail);
          }}
        >
          <img src="img/mail/forward.png" />
          Forward
        </button>
      </div>
    </div>
  );
}
