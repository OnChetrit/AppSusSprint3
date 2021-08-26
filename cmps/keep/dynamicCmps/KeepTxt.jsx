export function KeepTxt({ keep }) {
  console.log(keep);
  return (
    <div className="keep">
      <h4>{keep.info.title}</h4>
      <p>{keep.info.txt}</p>
    </div>
  );
}
