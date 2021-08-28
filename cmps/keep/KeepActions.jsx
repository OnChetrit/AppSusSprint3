import { ColorSelect } from './ColorSelect.jsx';

export class KeepActions extends React.Component {
  state = { keep: null, isColorPick: false };

  componentDidMount() {
    this.setState({
      keep: this.props.keep,
    });
  }

  onSetPinKeep = (keep) => {
    this.props.onPinKeep(keep);
  };

  onSendMail = (keep) => {
    this.props.setSendMail(keep);
  };

  onOpenColors = () => {
    this.setState((prevState) => ({ isColorPick: !prevState.isColorPick }));
  };

  render() {
    const { keep } = this.state;
    if (!keep) return <div>Loading...</div>;
    const { isColorPick } = this.state;
    const { onRemoveKeep, onKeepColorChange, onDuplicateKeep } = this.props;
    return (
      <div className="keep-actions">
        <button
          title="Remove Keep"
          onClick={(ev) => {
            ev.stopPropagation();
            onRemoveKeep(keep.id);
          }}
        >
          <img src="img/keep/remove.png" className="trash btn" />
        </button>
        <button
          title="Duplicate"
          onClick={(ev) => {
            ev.stopPropagation();
            onDuplicateKeep(keep);
          }}
        >
          <img src="img/keep/duplicate.svg" className="duplicate btn" />
        </button>
        <button
          title="Pick a color"
          className="btn btn-reset"
          onClick={(ev) => {
            ev.stopPropagation();
            this.onOpenColors();
          }}
        >
          <svg
            className="color-pallete"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 0 1 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z" />
            <circle cx="6.5" cy="11.5" r="1.5" />
            <circle cx="9.5" cy="7.5" r="1.5" />
            <circle cx="14.5" cy="7.5" r="1.5" />
            <circle cx="17.5" cy="11.5" r="1.5" />
          </svg>
        </button>
        <button
          title={keep.isPinned ? 'UnPin' : 'Pin'}
          className="btn btn-reset"
          onClick={(ev) => {
            ev.stopPropagation();
            this.onSetPinKeep(keep);
          }}
        >
          <img src={`img/keep/${keep.isPinned ? 'pin' : 'unpin'}.svg`} />
        </button>
        <button
          title="Send keep as mail"
          className="btn btn-reset"
          onClick={(ev) => {
            ev.stopPropagation();
            this.onSendMail(keep);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
          </svg>
        </button>

        {isColorPick && (
          <ColorSelect onKeepColorChange={onKeepColorChange} keepId={keep.id} />
        )}
      </div>
    );
  }
}
