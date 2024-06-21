import React from "react";

export function CameraCard({camera, openModal}){
    return (
        <div id={camera.id} className="card">
            <h2>{camera.nombre}</h2>
            <img src={camera.imagen} alt="Poster" />

            <button type="button" onClick={() => openModal(camera)}>info</button>
        </div>
    )
}