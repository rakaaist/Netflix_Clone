import "./index.scss";

function Modal({ id, video, toggleModal }) {
  return (
    <div
      className="modal"
      onClick={() => {
        toggleModal(false);
      }}
    >
      <iframe title={id} src={video} frameBorder="0" allowFullScreen />
    </div>
  );
}

export default Modal;