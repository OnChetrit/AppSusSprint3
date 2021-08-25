import { userService } from '../../services/user.service.js';
import { MailPreview } from './MailPreview.jsx';

export class MailList extends React.Component {

  onRemoveMail = (userId, mailId) => {
  userService.removeMail(userId,mailId)
  }
  

  render() {
    const { mails, user, onIsStared } = this.props;
    if (!mails) return <div>There's No Mails</div>;
    return (
      <div className="mail-list">
        {mails.map((mail) => (
          <MailPreview
            key={mail.id}
            mail={mail}
            user={user}
            onIsStared={onIsStared}
            onRemoveMail={this.onRemoveMail}
          />
        ))}
      </div>
    );
  }
}
