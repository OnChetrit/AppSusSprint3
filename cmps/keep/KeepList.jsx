import { KeepAdd } from './KeepAdd.jsx';
import { KeepPreview } from './KeepPreview.jsx';

export function KeepList({ keeps, onAdd }) {
  if (!keeps) return <div>Load</div>;
  return (
    <div className="keep-container">
      <KeepAdd onAdd={onAdd} />
      <div className="keep-list">
        {keeps.map((keep) => (
          <KeepPreview key={keep.id} keep={keep} />
        ))}
      </div>
    </div>
  );
}
