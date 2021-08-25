export function KeepTxt({keep}) {
    console.log(keep);
    return (
        <div className="keep-txt">
            <h1>{keep.info.txt}</h1>
        </div>
    )
}