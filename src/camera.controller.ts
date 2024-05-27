import { Controller, Get, Param } from '@nestjs/common';
import {CameraService } from './camera.service';
import { iCamera } from './camera.interface';


@Controller('/cameras') 
export class CameraController {
  constructor(private readonly CameraService: CameraService) {}

  @Get()
  getCamera(): Promise<iCamera[]>{
    return this.CameraService.getCameras();
  }

  @Get(':id')
  async getCameraId(
    @Param('id') id: number): Promise<iCamera>{
    return this.CameraService.getCameraId(id)
  }
}
