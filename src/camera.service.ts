import { Injectable, NotFoundException } from '@nestjs/common';
import { iCamera } from './camera.interface';
import { cameraDto } from './camera.dto';

const base_url: string = 'http://localhost:3030/cameras/';

@Injectable()
export class CameraService {
  
  async getCameras(): Promise<iCamera[]> {
    const res = await fetch(base_url);
    const cameras = await res.json();
    return cameras;
  }
  // Buascar por id
  async getCameraId(id: string): Promise<iCamera> {
    const res = await fetch(base_url + id);
    if (!res.ok) {
      throw new NotFoundException(`Camera con id ${id} no existe`);
    }
    const camera = await res.json();
    return camera;
  }

  //Buscar por nombre
  // http://localhost:3000/cameras/buscar?nombre=panasonic lumix gh5

  async getCameraNombre(nombre: string): Promise<iCamera[]> {
    // Convertir el nombre de consulta a minúsculas
    const nombreUrl = nombre.toLowerCase(); 
    // Reemplazar los espacios en blanco con el carácter "+"
    const nombreQueryParam = encodeURIComponent(nombreUrl);
    const res = await fetch(`${base_url}?nombre=${nombreQueryParam}`); // pasamos el nombre como un parametro de consulta a la url
    const cameras = await res.json();
    return cameras;
  }

  //Agregar una nueva camara
  async addCamera(cameraDto:cameraDto) {
    const id = await this.setId();
    const newCamera = { id, ...cameraDto };
    const res = await fetch(base_url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newCamera),
    });
    const parsed = await res.json();
    return parsed;
  }

 // Generador de ID
private async setId(): Promise<string> {
  const cameras = await this.getCameras();
  const lastId = cameras[cameras.length - 1].id;
  const newId = (parseInt(lastId, 10) + 1).toString();// Convertir a número, luego a cadena
  return newId;
}

  //Modificar una camera
  async updateCameraId(id: string, body: iCamera): Promise<any> {
    const isCamera = await this.getCameraId(id);
    if (!Object.keys(isCamera).length) return;
    const updateCamera = { ...body, id };
    await fetch(base_url + id, {
      method: 'PUT',
      headers: {
        'content-types': 'application/json',
      },
      body: JSON.stringify(updateCamera),
    }); 
    return updateCamera
  }

  //Borrar una camera por id
  async deleteCameraId(id: string): Promise<any> {
    const res = await fetch(base_url + id, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new NotFoundException(`Camera con id ${id} no existe`);
    }
    const parsed = await res.json();
    return parsed;
  }
} 
