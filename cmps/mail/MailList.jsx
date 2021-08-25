import { MailPreview } from './MailPreview.jsx';

export class MailList extends React.Component {
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
          />
        ))}
      </div>
    );
  }
}
