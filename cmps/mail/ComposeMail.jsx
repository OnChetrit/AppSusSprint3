import { userService } from '../../services/user.service.js';

export class ComposeMail extends React.Component {
  state = {
    mail: {
      sendTo: '',
      subject: '',
      body: '',
    },
  };
  draftMailId = -1;

  componentDidMount() {
    const keepToMail = this.props.keepToMail;
    if (keepToMail) {
      const subject = keepToMail.subject;
      const body = keepToMail.body;
      this.setState({
        mail: { ...this.setState.mail, subject: subject, body: body },
      });
    }
    // this.draftInterval = setInterval(this.setDraft, 5000)
    const replyMail = this.props.replyMail;
    const forwardMail = this.props.forwardMail;
    if (replyMail) {
      const beforeMessage = `\n\n\n\n\n\n=====================================================>\n${userService.timeSendDetails(
        this.props.mail.sentAt
      )}\n`;
      const sendTo = replyMail.fromMail;
      const subject = replyMail.subject;
      const body = beforeMessage + '\n' + replyMail.body;
      this.setState({
        mail: {
          ...this.state.mail,
          sendTo: sendTo,
          subject: subject,
          body: body,
        },
      });
    } else if (forwardMail) {
      const beforeMessage = `\n\n\n\n\n\n=====================================================>\n${userService.timeSendDetails(
        this.props.mail.sentAt
      )}\n`;
      const subject = forwardMail.subject;
      const body = beforeMessage + '\n' + forwardMail.body;
      this.setState({
        mail: { ...this.state.mail, sendTo: '', subject: subject, body: body },
      });
    }
  }

  // componentWillUnmount() {
  //   clearInterval(this.draftInterval)
  // }

  setDraft = () => {
    const mail = this.state.mail;
    const user = this.props.user;
    const draftMail = user.draftEmails;

    const from = user.username;
    const fromMail = user.emailAddress;
    const subject = mail.subject;
    const body = mail.body;

    let mailToDraft = null;
    if (this.draftMailId === -1) {
      mailToDraft = userService.createDraftMail(from, subject, body, fromMail);
      this.draftMailId = mailToDraft.id;
    }

    if (
      userService.isDraftMailExist(this.draftMailId, mailToDraft, draftMail)
    ) {
      userService.updateDraftMail(this.draftMailId, draftMail);
      return;
    }
    draftMail.unshift(mailToDraft);
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({
      mail: { ...prevState.mail, [field]: value },
    }));
  };

  onSaveMail = (ev) => {
    ev.preventDefault();
    if (userService.ValidateEmail(this.state.mail.sendTo)) {
      this.props.onToggleCompose();
      this.props.onComposeMail(this.state.mail);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You Have Enter Wrong Email Address!',
      });
    }
  };

  render() {
    const { onToggleCompose, onDraftMail } = this.props;
    const { sendTo, subject, body } = this.state.mail;
    return (
      <div>
        <form className="compose-mail" onSubmit={this.onSaveMail}>
          <h4>New Message</h4>
          <div className="close-compose btn" onClick={onToggleCompose}>
            <img src="../img/close.png"></img>
          </div>
          <div className="inputs">
            <label htmlFor="sendTo"></label>
            <input
              type="text"
              name="sendTo"
              required
              id="sendTo"
              required
              value={sendTo}
              onChange={this.handleChange}
              placeholder="To"
            />

            <label htmlFor="subject"></label>
            <input
              type="text"
              name="subject"
              id="subject"
              required
              value={subject}
              onChange={this.handleChange}
              placeholder="Subject"
            />

            <label htmlFor="body"></label>
            <textarea
              name="body"
              id="body"
              required
              value={body}
              onChange={this.handleChange}
              placeholder="Your message"
              row="4"
              cols="50"
            />
          </div>

          <button className="btn">Send</button>
        </form>
      </div>
    );
  }
}
