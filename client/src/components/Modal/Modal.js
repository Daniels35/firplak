import React from 'react';
import './Modal.css';
const Modal = ({ children, isVisible, onClose }) => {

  const closeModal = () => {
    if (isVisible) {
      onClose();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div
        className="modal-overlay"
        onClick={closeModal}
      >
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <button
            onClick={onClose}
            className="close-button"
          >
            X
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
