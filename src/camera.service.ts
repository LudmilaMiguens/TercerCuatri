import { Injectable } from '@nestjs/common';
import { iCamera } from './camera.interface';


const base_url: string = 'http://localhost:3030/cameras/';

@Injectable()
export class CameraService {
  async getCameras(): Promise<iCamera[]> {
    const res = await fetch(base_url);
    const cameras = await res.json();
    return cameras;
  }
  // Buascar por id
  async getCameraId(id: number): Promise<iCamera> {
    const res = await fetch(base_url + id);
    const camera = await res.json();
    return camera;
  }
  //Buscar por nombre
  async getCameraNombre(nombre:string){
    const res = await fetch(base_url + nombre);
    const camera = await res.json();
    return camera;
  }


  //Agregar una nueva camara
  async addCamera(camera: iCamera) {
    const id = await this.setId();
    const newCamera = { id, ...camera };
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
  //Generador Id
  private async setId(): Promise<number> {
    const cameras = await this.getCameras();
    const id = cameras[cameras.length - 1].id + 1;
    return id;
  }

  //Modificar una camera
  async updateCameraId(id: number, body: iCamera): Promise<any> {
    const isCamera = await this.getCameraId(id);
    if (!Object.keys(isCamera).length) return;
    const updateCamera = { ...body, id };
    console.log('Update Camera', updateCamera);
    const res = await fetch(base_url + id, {
      method: 'PUT',
      headers: {
        'content-types': 'application/json',
      },
      body: JSON.stringify(updateCamera),
    });
    const parsed = await res.json()
    return parsed;
  }

  //Borrar una camera por id
  async deleteCameraId(id:number): Promise<any>{
    const res = await fetch(base_url +id,{
      method: 'DELETE',
    });
    const parsed = await res.json();
    return parsed;
  }
} 
