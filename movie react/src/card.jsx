import React from "react";
import './card.css'
import './modal.css'

export function MovieCard({movie, openModal}){
    return (
        <div id={movie.id} className="card">
            <h1>{movie.title} </h1>

           <img src={movie.poster} alt="Poster"/>

           <button type="button" onClick={() => openModal(movie)}>info</button>

        </div>
    )
}