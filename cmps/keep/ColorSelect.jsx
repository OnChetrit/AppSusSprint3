export function ColorSelect({ keepId, onKeepColorChange }) {
  function pickColor(color) {
    onKeepColorChange(keepId, color);
    // toggleColorpicker();
  }

  return (
    <div className="color-select">
      <div
        onClick={() => {
          pickColor('#db4b4b');
        }}
        className="color red btn"
      ></div>
      <div
        onClick={() => {
          pickColor('#5cc077');
        }}
        className="color green btn"
      ></div>
      <div
        onClick={() => {
          pickColor('#62a8e4');
        }}
        className="color lightBlue btn"
      ></div>
      <div
        onClick={() => {
          pickColor('#fff3bf');
        }}
        className="color lightyellow btn"
      ></div>
      <div
        onClick={() => {
          pickColor('#ffa24a');
        }}
        className="color lightgreen btn"
      ></div>
      <div
        onClick={() => {
          pickColor('#ff65a3');
        }}
        className="color pink btn"
      ></div>
    </div>
  );
}
