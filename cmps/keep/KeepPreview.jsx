import { KeepImg } from "./dynamicCmps/KeepImg.jsx"
import { KeepTodo } from "./dynamicCmps/KeepTodo.jsx"
import { KeepTxt } from "./dynamicCmps/KeepTxt.jsx"


export function KeepPreview({keep}) {
    // if(!keep) return <div>load</div>
    console.log(keep);
    // const DynamicCmp = (props) =>{
    //     switch (props.type) {
    //         case 'txt':
    //             return <KeepTxt keep={keep}/>
    //         case 'img':
    //             return <KeepImg keep={keep}/>    
    //         case 'todo':
    //             return <KeepTodo keep={keep}/>   
    //     }
    // }
    return (
        <div className="keep-preview">
            {keep.type === 'txt' ? <KeepTxt keep={keep}/> : keep.type === 'img' ? <KeepImg keep={keep}/> : <KeepTodo keep={keep}/> }
            {/* <DynamicCmp keep={keep}/> */}
        </div>
    ) 

}