import React from "react";
import './modal.css';

export function Modal({movie, closeModal}){
    return(
        <div className="modal">
            <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h1>{movie.title}</h1>
            <h3>Año: {movie.year}</h3>
            <h3>Director: {movie.director}</h3>
            <h3>Duracion: {movie.duration}</h3>
            <h3>Genero: {movie.genero}</h3> {/*No puedo mostar el arreglo que tengo en genero */}
            <h3>Rate: {movie.rate}</h3>
              </div>
            </div>
    )

}