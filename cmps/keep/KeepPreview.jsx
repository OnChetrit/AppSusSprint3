import { KeepTxt } from '../keep/dynamicCmps/KeepTxt.jsx';
import { KeepTodo } from '../keep/dynamicCmps/KeepTodo.jsx';
import { KeepImg } from '../keep/dynamicCmps/KeepImg.jsx';

export function KeepPreview({
  keep,
  onRemoveKeep,
  onKeepColorChange,
  onDuplicateKeep,
}) {
  const DynamicKeep = (props) => {
    switch (props.keep.type) {
      case 'txt':
        return <KeepTxt {...props} />;
      case 'todo':
        return <KeepTodo {...props} />;
      case 'img':
        return <KeepImg {...props} />;
    }
  };
  return (
    <DynamicKeep
      keep={keep}
      onDuplicateKeep={onDuplicateKeep}
      onRemoveKeep={onRemoveKeep}
      onKeepColorChange={onKeepColorChange}
    />
  );
}
