export function ImgSelect({ imgs, onSwitchBackground }) {
  return (
    <div className="imgs-container flex space-evenly">
      {imgs.map((img, idx) => {
        return (
          <img
            onClick={() => {
              onSwitchBackground(idx);
            }}
            className="btn img-card"
            key={idx}
            src={`img/${img}`}
          />
        );
      })}
    </div>
  );
}
