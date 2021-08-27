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
  onSelectMail,
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
        <button
          className={`btn selecting`}
          onClick={(ev) => {
            ev.stopPropagation();
            onSelectMail(mail, user);
          }}
        >
          <img
            src={`../img/mail/${mail.isSelected ? 'unselect' : 'select'}.png`}
          />
        </button>
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
        {/* <div className="mail-body">
          <p>{mail.body}</p>
        </div> */}
      </div>
      <div className="flex btn-mail al-content-center">
        <button
          className="btn spam-mail"
          onClick={(ev) => {
            ev.stopPropagation();
            onSetArchive(user, mail);
          }}
        >
          <div className="icon-container">
            <img src="../img/mail/archive-filter.png" />
          </div>
        </button>
        <button
          className={`btn ${mail.isArchive ? 'hide' : ''}`}
          onClick={(ev) => {
            ev.stopPropagation();
            onRemoveMail(mail.id, mails, user);
          }}
        >
          <div className="icon-container">
            <img src="../img/mail/trash-filter.png" />
          </div>
        </button>
        <button
          className={`btn ${mail.isTrash ? '' : 'hide'}`}
          onClick={(ev) => {
            ev.stopPropagation();
            onRestoreMail(mail.id, mails, user);
          }}
        >
          <div className="icon-container">
            <img src="../img/mail/restore.png" />
          </div>
        </button>
        <button
          className="btn"
          onClick={(ev) => {
            if (mail.isTrash) return;
            ev.stopPropagation();
            onSetRead(mail);
          }}
        >
          <div className="icon-container ">
            <img src={`../img/mail/${mail.isRead ? 'unread' : 'read'}.png`} />
          </div>
        </button>
      </div>
      <h6 className="show-time">{userService.getEmailTimeSent(mail.sentAt)}</h6>
    </div>
  );
}
