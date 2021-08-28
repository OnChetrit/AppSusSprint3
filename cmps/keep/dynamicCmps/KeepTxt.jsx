import { KeepActions } from '../KeepActions.jsx';

export function KeepTxt({
  keep,
  onRemoveKeep,
  onKeepColorChange,
  onDuplicateKeep,
  onPinKeep,
  setSendMail,
}) {
  return (
    <div className="keep" style={{ backgroundColor: keep.color }}>
      <h4>{keep.info.title}</h4>
      <p>{keep.info.txt}</p>
      <KeepActions
        onKeepColorChange={onKeepColorChange}
        onDuplicateKeep={onDuplicateKeep}
        onRemoveKeep={onRemoveKeep}
        onPinKeep={onPinKeep}
        setSendMail={setSendMail}
        keep={keep}
      />
    </div>
  );
}
