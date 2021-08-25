export class MailList extends React.Component {

    render() {
        const {mails, currUser, onIsStared} = this.props;
        return (
            <div className="mail-list">           
                {mails.map((mail) => (
                  <div key={mail.id} className="mail-card flex">
                    <i className={mail.isStared ? "fa fa-star star gold" : "fa fa-star-o star"} aria-hidden="true" onClick={() => {
                        onIsStared(currUser.id, mail.id)
                    }}></i>
                    <h4>{mail.from}</h4>
                    <h4>{mail.subject}</h4>
                    <p>{mail.body}</p>
                  </div>
                ))}
            </div>
            )
    }
}
