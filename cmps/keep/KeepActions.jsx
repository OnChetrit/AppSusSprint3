import { ColorSelect } from './ColorSelect.jsx';

export class KeepActions extends React.Component {
  state = { keep: null };

  componentDidMount() {
    this.setState({
      keep: this.props.keep,
    });
  }

  render() {
    const { keep } = this.state;
    if (!keep) return <div>Loading...</div>;

    const { onRemoveKeep, onKeepColorChange, onDuplicateKeep } = this.props;
    return (
      <div className="actions">
        <button onClick={() => onRemoveKeep(keep.id)}>
          <img
            title="Remove Keep"
            src="../img/trash.png"
            className="trash btn"
          />
        </button>
        <button onClick={() => onDuplicateKeep(keep)}>
          <img
            title="Duplicate"
            src="../img/keep/duplicate.png"
            className="duplicate btn"
          />
        </button>
        <ColorSelect onKeepColorChange={onKeepColorChange} keepId={keep.id} />
      </div>
    );
  }
}
