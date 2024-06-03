import { Controller, Get, Param, Body,Post, Put,Delete, Query } from '@nestjs/common';
import {CameraService } from './camera.service';
import { iCamera } from './camera.interface';


@Controller('/cameras/') 
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

  @Get('nombre')
  
  async getCameraNombre(
    @Query('nombre') nombre: string){
      return this.CameraService.getCameraNombre(nombre);
    }

  @Post()
  create(@Body()camera:iCamera): Promise <any> {
    return this.CameraService.addCamera(camera);
  }

  @Put(':id')
  updateCameraId(@Param('id') id:number, @Body() body):Promise<any>{
    return this.CameraService.updateCameraId(id, body)
  }


  @Delete(':id')
  deleteCameraId(@Param('id') id:number){
    return this.CameraService.deleteCameraId(id);
  }
}
 