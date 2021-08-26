export class ComposeMail extends React.Component {
  state = {
    mail: {
      sendTo: '',
      subject: '',
      body: '',
    },
  };

  componentDidMount() {
    const replyMail = this.props.replyMail
    const forwardMail = this.props.forwardMail
    if (replyMail) {
      const sendTo = replyMail.fromMail
      const subject = replyMail.subject
      const body = replyMail.body
      this.setState({mail: {...this.state.mail, sendTo:sendTo, subject:subject, body:body}})
    } else if(forwardMail) {
      const subject = forwardMail.subject
      const body = forwardMail.body
      this.setState({mail: {...this.state.mail, subject:subject, body:body}})
    }
  }

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({
      mail: { ...prevState.mail, [field]: value },
    }));
  };

  onSaveMail = (ev) => {
    ev.preventDefault();
    this.props.onToggleCompose();
    this.props.onComposeMail(this.state.mail);
  };

  render() {
    const { onToggleCompose} = this.props;
    const {sendTo, subject, body} = this.state.mail;
    return (
      <div>
        <form className="compose-mail" onSubmit={this.onSaveMail}>
          <h4>New Message</h4>
          <div className="close-compose btn" onClick={onToggleCompose}>
            <img src="../img/mail/close-grey.png"></img>
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
