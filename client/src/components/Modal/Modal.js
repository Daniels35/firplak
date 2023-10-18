import React from 'react';

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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
        onClick={closeModal}
      >
        <div
          style={{
            position: 'relative',
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '10px',
            zIndex: 1001,
            margin: '0 1.2rem 0 1.2rem',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '-15px',
              right: '-5px',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '30px',
              fontWeight: 'bold',
              color: 'red',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            X
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
