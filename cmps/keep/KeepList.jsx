import { KeepPreview } from './KeepPreview.jsx';

export function KeepList({ keeps }) {
  if (!keeps) return <div>Load</div>;
  console.log(`keeps`, keeps);
  return (
    <div className="keep-list">
      {keeps.map((keep) => (
        <KeepPreview key={keep.id} keep={keep} />
      ))}
    </div>
  );
}
