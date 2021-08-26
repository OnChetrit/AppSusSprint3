export function KeepImg({ keep }) {
  return (
    <div className="keep">
      <img src={keep.info.url} />
      <h4>{keep.info.title}</h4>
      <p>{keep.info.txt}</p>
    </div>
  );
}
