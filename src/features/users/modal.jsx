export const Modal = ({ children, setModal }) => {
  return (
    <div className="modal-background">
      <div
        className="modal-content "
        style={{ maxWidth: "30rem", width: "100%" }}
      >
        <div className="flex-horizontal center-align space-between">
          <div>
            <button onClick={() => setModal(false)} className=" btn-box ">
              <span className=" material-icons-outlined icon-color-gray ">
                close
              </span>
            </button>
          </div>
        </div>
        <div className="padding-right">{children}</div>
      </div>
    </div>
  );
};
