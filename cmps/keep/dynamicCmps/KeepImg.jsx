import { KeepActions } from '../KeepActions.jsx';

export function KeepImg({
  keep,
  onRemoveKeep,
  onKeepColorChange,
  onDuplicateKeep,
}) {
  return (
    <div className="keep" style={{ backgroundColor: keep.color }}>
      <img src={keep.info.url} />
      <h4>{keep.info.title}</h4>
      <p>{keep.info.txt}</p>
      <KeepActions
        // onNoteColorChange={this.props.onNoteColorChange}
        // onPinned={this.props.onPinned}
        // onCopyToClipboard={this.props.onCopyToClipboard}
        onKeepColorChange={onKeepColorChange}
        onDuplicateKeep={onDuplicateKeep}
        onRemoveKeep={onRemoveKeep}
        keep={keep}
      />
    </div>
  );
}
