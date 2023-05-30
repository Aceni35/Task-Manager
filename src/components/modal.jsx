const Modal = ({ modalinput, setModalinput, dispatch, turnoffmodal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Enter updated task</h2>
        <input
          type="text"
          value={modalinput}
          onChange={(e) => {
            setModalinput(e.target.value);
          }}
        />
        <button
          className="modal-btn"
          onClick={() => {
            if (modalinput) {
              dispatch({ type: "COMPLETE_CHNAGE", payload: modalinput });
              setModalinput("");
            } else {
              dispatch({ type: "NO_VALUE" });
              turnoffmodal();
            }
          }}
        >
          Save
        </button>
        <button
          className="modal-btn"
          onClick={() => {
            dispatch({ type: "CLOSE_MODAL" });
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
