export const EditProfileModal = ({ children, setModal }) => {
  return (
    <div className="modal-background ">
      <div className="modal-content margin-top modal-size">
        <div className="flex-horizontal center-align space-between">
          <div>
            <button onClick={() => setModal(false)} className=" btn-box ">
              <span className=" material-icons-outlined icon-color-gray cursor-pointer">
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
