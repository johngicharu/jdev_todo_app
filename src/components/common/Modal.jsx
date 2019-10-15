import React from "react";

class Modal extends React.Component {
  componentDidMount() {
    document.body.style.overflowY = "hidden";
  }
  handleClose = e => {
    e.preventDefault();
    document.body.style.overflowY = "auto";
    if (e.target.classList.contains("cancel")) {
      this.props.onCloseFunc(false);
    } else if (e.target.classList.contains("ok")) {
      this.props.onCloseFunc(true);
    }
  };

  render() {
    return (
      <div className="jdev_modal" id="Modal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ModalTitle">
                {this.props.title}
              </h5>
              <button
                type="button"
                className="close cancel"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.handleClose}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">{this.props.body}</div>
            <div className="modal-footer">
              {this.props.cancelBtn ? (
                <button
                  type="button"
                  className="btn btn-secondary cancel"
                  data-dismiss="modal"
                  onClick={this.handleClose}
                >
                  Cancel
                </button>
              ) : null}
              <button
                type="button"
                className="btn btn-primary ok"
                onClick={this.handleClose}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
