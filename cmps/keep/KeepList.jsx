import { KeepPreview } from './KeepPreview.jsx';

export function KeepList({
  onKeepColorChange,
  onDuplicateKeep,
  onRemoveKeep,
  onCheckTodo,
  setSendMail,
  onPinKeep,
  keeps,
  user,
}) {
  if (!keeps) return <div>Load</div>;
  return (
    <div className="keep-list">
      {keeps.map((keep) => (
        <KeepPreview
          onKeepColorChange={onKeepColorChange}
          onDuplicateKeep={onDuplicateKeep}
          onRemoveKeep={onRemoveKeep}
          onCheckTodo={onCheckTodo}
          setSendMail={setSendMail}
          onPinKeep={onPinKeep}
          key={keep.id}
          keep={keep}
          user={user}
        />
      ))}
    </div>
  );
}
