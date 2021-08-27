import { mailService } from '../../services/mail.service.js';
import { userService } from '../../services/user.service.js';

export function MailPreview({
  mail,
  mails,
  user,
  onIsStared,
  onRemoveMail,
  onSetArchive,
  onRestoreMail,
  onOpenMail,
  onSetRead,
  onSelectMail
}) {
  const bodyToPreview =
    mail.body.length > 80 ? mail.body.substr(0, 80) + '...' : mail.body;
  return (
    <div
      key={mail.id}
      onClick={() => {
        onOpenMail(mail);
      }}
      className={`mail-preview flex space-between btn  ${
        mail.isRead ? 'read' : ''
      } ${mail.isSelected ? 'selected-mail' : ''}`}
    >
      <div className="left-side flex al-items-center">
        <div
          className="star-icon"
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
        <h4>{mail.from}</h4>
        <h5 className="subject">{mail.subject} - </h5>
        <p>{bodyToPreview}</p>
        {/* <p>{mail.body}</p> */}
      </div>
      <div className="flex btn-mail">
        <button
          className="btn spam-mail"
          onClick={(ev) => {
            ev.stopPropagation();
            onSetArchive(user, mail);
          }}
        >
          <img src="../img/mail/archive.png" />
        </button>
        <button
          className="btn"
          onClick={(ev) => {
            ev.stopPropagation();
            onRemoveMail(mail.id, mails, user);
          }}
        >
          <img src="../img/mail/trash.png" />
        </button>
        <button
          className="btn"
          onClick={(ev) => {
            ev.stopPropagation();
            onRestoreMail(mail.id, mails, user);
          }}
        >
          R
        </button>
        <button
          className="btn"
          onClick={(ev) => {
            ev.stopPropagation();
            onSetRead(mail);
          }}
        >
          <img src={`../img/mail/${mail.isRead ? 'unread' : 'read'}.png`} />

          {/* <span>{mail.isRead ? 'UnRead' : 'Read'}</span> */}
        </button>
        <button
          className={`btn`}
          onClick={(ev) => {
            ev.stopPropagation();
            onSelectMail(mail, user);
          }}
        >
          Slt
        </button>
      </div>
      <h6 className="show-time">{userService.getEmailTimeSent(mail.sentAt)}</h6>
    </div>
  );
}
