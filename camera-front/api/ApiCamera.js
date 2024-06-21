const API = 'http://localhost:3030';

export const getCamera = () => fetch(`${API}/cameras`)

//para traer todas las camaras
export const getCameras = async () => {
  const response = await fetch(API);
  return response.json();
};
//trae la camara por id
export const getCameraById = async (id) => {
  const response = await fetch(`${API}/${id}`);
  return response.json();
};
//trae la camara por nombre
export const getCameraByName = async (nombre) => {
  const response = await fetch(`${API}?nombre=${nombre}`);
  return response.json();
};
//agregar una camara
export const addCamera = async (camera) => {
  const response = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(camera),
  });
  return response.json();
};
//editar una camara
export const editCamera = async (id, camera) => {
  const response = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(camera),
  });
  return response.json();
};
//eliminar una camara
export const deleteCamera = async (id) => {
  const response = await fetch(`${API}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
