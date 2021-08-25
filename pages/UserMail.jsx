import { MailList } from "../cmps/MailList.jsx";

export function UserMail({ currUser , onIsStared}) {
  const mails = currUser.mails;
  return (
    <div className="user-mail">
      <div className="mails-container">
        <MailList mails={mails} currUser={currUser} onIsStared={onIsStared}/>
      </div>
    </div>
  );
}
