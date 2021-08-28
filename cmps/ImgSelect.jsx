export function ImgSelect({ imgs, onSwitchBackground, onToggleImgContainer }) {
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

      <svg
        onClick={() => {
          onToggleImgContainer();
        }}
        className="close-modal btn"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    </div>
  );
}
