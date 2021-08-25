import { userService } from '../../services/user.service.js';
import { MailPreview } from './MailPreview.jsx';

export function MailList({ mails, user, onIsStared, onRemoveMail }) {
  if (!mails) return <div>There's No Mails</div>;
  return (
    <div className="mail-list">
      {mails.map((mail) => (
        <MailPreview
          key={mail.id}
          mail={mail}
          user={user}
          onIsStared={onIsStared}
          onRemoveMail={onRemoveMail}
        />
      ))}
    </div>
  );
}
