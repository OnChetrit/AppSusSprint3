import { userService } from '../../services/user.service.js';

export function MailPreview({ mail, user, onIsStared, onRemoveMail }) {
  const bodyToPreview =
    mail.body.length > 100 ? mail.body.substr(0, 100) + '...' : mail.body;
  return (
    <div key={mail.id} className="mail-card flex">
      <i
        className={mail.isStared ? 'fa fa-star star gold' : 'fa fa-star-o star'}
        aria-hidden="true"
        onClick={() => {
          onIsStared(user.id, mail.id);
        }}
      ></i>
      <h4>{mail.from}</h4>
      <h4>{mail.subject}</h4>
      <p>{bodyToPreview}</p>
      <h5>{userService.getEmailTimeSent(mail.sentAt)}</h5>
      <button
        onClick={() => {
          onRemoveMail(user, mail.id);
        }}
      >
        X
      </button>
    </div>
  );
}
