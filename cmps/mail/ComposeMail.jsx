export class ComposeMail extends React.Component {
  state = {
    mail: {
      sendTo: '',
      subject: '',
      body: '',
    },
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
    this.props.onToggleCompose();
    this.props.onComposeMail(this.state.mail);
  };

  render() {
    const { onToggleCompose } = this.props;
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
              onChange={this.handleChange}
              placeholder="To"
            />

            <label htmlFor="subject"></label>
            <input
              type="text"
              name="subject"
              id="subject"
              required
              onChange={this.handleChange}
              placeholder="Subject"
            />

            <label htmlFor="body"></label>
            <textarea
              name="body"
              id="body"
              required
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
