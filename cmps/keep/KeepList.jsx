import { KeepAdd } from './KeepAdd.jsx';
import { KeepPreview } from './KeepPreview.jsx';

export function KeepList({
  keeps,
  onAdd,
  onRemoveKeep,
  onKeepColorChange,
  onDuplicateKeep,
}) {
  if (!keeps) return <div>Load</div>;
  return (
    <div className="keep-container">
      <KeepAdd onAdd={onAdd} />
      <div className="keep-list">
        {keeps.map((keep) => (
          <KeepPreview
            key={keep.id}
            onKeepColorChange={onKeepColorChange}
            onRemoveKeep={onRemoveKeep}
            onDuplicateKeep={onDuplicateKeep}
            keep={keep}
          />
        ))}
      </div>
    </div>
  );
}
