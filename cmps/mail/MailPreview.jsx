const { Link } = ReactRouterDOM;

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
}) {
  const bodyToPreview =
    mail.body.length > 100 ? mail.body.substr(0, 100) + '...' : mail.body;
  return (
    <div
      key={mail.id}
      className="mail-card flex btn space-between"
      onClick={() => {
        onOpenMail();
      }}
    >
      {/* <div key={mail.id} className={`mail-card flex btn space-between ${mail.isRead ? 'read' : ''}`} onClick={() => {
      onSetRead(mail)
    }}> */}
      <div className="flex al-items-center">
        <i
          className={
            mail.isStared ? 'fa fa-star star gold' : 'fa fa-star-o star'
          }
          aria-hidden="true"
          onClick={() => {
            onIsStared(user.id, mail.id);
          }}
        ></i>
        <h4>{mail.from}</h4>
        <h5>{mail.subject}-</h5>
        <p>{bodyToPreview}</p>
      </div>
      <div className="flex">
        <h5>{mailService.getEmailTimeSent(mail.sentAt)}</h5>
        <button
          className="btn spam-mail"
          onClick={() => {
            onSetArchive(user, mail);
          }}
        >
          Archive
        </button>
        <button
          className="btn remove-mail"
          onClick={() => {
            onRemoveMail(mail.id, mails, user);
          }}
        >
          X
        </button>
        <button
          className="btn restore-mail"
          onClick={() => {
            onRestoreMail(mail.id, mails, user);
          }}
        >
          R
        </button>
      </div>
    </div>
  );
}
