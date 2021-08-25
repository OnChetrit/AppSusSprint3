import { KeepTxt } from '../keep/dynamicCmps/KeepTxt.jsx';
import { KeepTodo } from '../keep/dynamicCmps/KeepTodo.jsx';
import { KeepImg } from '../keep/dynamicCmps/KeepImg.jsx';

export function KeepPreview({ keep }) {
  console.log(`keep`, keep);
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
    <div className={keep.type}>
      <h3>keep</h3>
      {<DynamicKeep keep={keep} />}
    </div>
  );
}
