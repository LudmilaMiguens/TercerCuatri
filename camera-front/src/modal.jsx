import React from "react";
import './modal.css'

export function Modal({ camera, closeModal }) {
    return (
        <div className="modal">
            <div className="modal-content">
               <span className="close" onClick={closeModal}>&times;</span>
            <p>Descripcion: {camera.descripcion}</p> 
            </div>
        </div>
    )
}