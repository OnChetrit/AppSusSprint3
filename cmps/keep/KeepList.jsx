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
      <div className="add-keep-container flex direction-col al-content-center">
        <KeepAdd onAdd={onAdd} />
      </div>
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
