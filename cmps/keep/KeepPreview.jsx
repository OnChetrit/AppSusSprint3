import { KeepImg } from "./dynamicCmps/KeepImg"
import { KeepTodo } from "./dynamicCmps/KeepTodo"
import { KeepTxt } from "./dynamicCmps/KeepTxt"

export function KeepPreview({keep}) {
    const DynamicCmp = (props) =>{
        switch (props.keep.type) {
            case 'txt':
                return <KeepTxt keep={keep}/>
            case 'img':
                return <KeepImg keep={keep}/>    
            case 'todo':
                return <KeepTodo keep={keep}/>   
        }
        console.log(DynamicCmp);
    }
    return (
        <div className="keep-preview">
            <DynamicCmp/>
        </div>
    ) 

}