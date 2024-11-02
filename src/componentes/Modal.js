import React from 'react';
import '../estilos/Modal.css'; // Archivo CSS que se encargará del estilo del modal

const Modal = ({ mensaje, closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Mensaje</h3>
        <p>{mensaje}</p>
        <button onClick={closeModal}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
