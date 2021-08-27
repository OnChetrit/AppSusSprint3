import { KeepAdd } from './KeepAdd.jsx';
import { KeepPreview } from './KeepPreview.jsx';

export function KeepList({
  keeps,
  onAdd,
  onRemoveKeep,
  onKeepColorChange,
  onDuplicateKeep,
  onPinKeep,
  setSendMail,
}) {
  if (!keeps) return <div>Load</div>;
  return (
    // <div className="keep-container">
    <div className="keep-list">
      {keeps.map((keep) => (
        <KeepPreview
          key={keep.id}
          onKeepColorChange={onKeepColorChange}
          onRemoveKeep={onRemoveKeep}
          onDuplicateKeep={onDuplicateKeep}
          onPinKeep={onPinKeep}
          setSendMail={setSendMail}
          keep={keep}
        />
      ))}
    </div>
    // </div>
  );
}
