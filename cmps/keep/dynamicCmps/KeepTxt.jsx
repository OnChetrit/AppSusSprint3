import { KeepActions } from '../KeepActions.jsx';

export function KeepTxt({
  keep,
  onRemoveKeep,
  onKeepColorChange,
  onDuplicateKeep,
}) {
  console.log(`keep`, keep);
  return (
    <div className="keep btn" style={{ backgroundColor: keep.color }}>
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
