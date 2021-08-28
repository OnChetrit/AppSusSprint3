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
  onSetMailAsKeep,
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
      <button
        title="Select"
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
        title={mail.isStared ? 'Starred' : 'Not starred'}
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
      <div className="flex btn-mail al-content-center">
        <button
          title="Save as keep"
          className={`btn`}
          onClick={(ev) => {
            ev.stopPropagation();
            onSetMailAsKeep(mail, user);
          }}
        >
          <div className="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
            </svg>
          </div>
        </button>
        <button
          title="Important"
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
          title="Remove"
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
          title="Restore"
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
          title={`Mark as ${mail.isRead ? 'unread' : 'read'}`}
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
      <h6 title="Sent at" className="show-time">
        {userService.getEmailTimeSent(mail.sentAt)}
      </h6>
    </div>
  );
}
