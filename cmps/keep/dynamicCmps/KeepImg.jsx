import { KeepActions } from '../KeepActions.jsx';

export function KeepImg({
  keep,
  onRemoveKeep,
  onKeepColorChange,
  onDuplicateKeep,
  onPinKeep,
  setSendMail,
}) {
  return (
    <div className="keep" style={{ backgroundColor: keep.color }}>
      <img className="radius-img" src={keep.info.url} />
      <h4>{keep.info.title}</h4>
      <p>{keep.info.txt}</p>
      <KeepActions
        onKeepColorChange={onKeepColorChange}
        onDuplicateKeep={onDuplicateKeep}
        onRemoveKeep={onRemoveKeep}
        setSendMail={setSendMail}
        onPinKeep={onPinKeep}
        keep={keep}
      />
    </div>
  );
}
