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

  async getCameraId(id: number): Promise<iCamera> {
      const res = await fetch(base_url + id);
    const camera = await res.json();
    return camera;
  }
} 
