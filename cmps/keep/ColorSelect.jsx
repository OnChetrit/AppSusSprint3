export function ColorSelect({ keepId, onKeepColorChange }) {
  function pickColor(color) {
    onKeepColorChange(keepId, color);
  }

  return (
    <div className="color-select">
      <div
        onClick={() => {
          pickColor('#f28b82');
        }}
        className="color red btn"
      ></div>
      <div
        onClick={() => {
          pickColor('#ccff90');
        }}
        className="color green btn"
      ></div>
      <div
        onClick={() => {
          pickColor('#a7ffeb');
        }}
        className="color lightTurkiz btn"
      ></div>
      <div
        onClick={() => {
          pickColor('#fff475');
        }}
        className="color lightyellow btn"
      ></div>
      <div
        onClick={() => {
          pickColor('#aecbfa');
        }}
        className="color lightBlue btn"
      ></div>
      <div
        onClick={() => {
          pickColor('#e8eaed');
        }}
        className="color grey btn"
      ></div>
    </div>
  );
}
