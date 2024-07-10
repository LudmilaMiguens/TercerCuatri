import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  Query,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { CameraService } from './camera.service';
import { iCamera } from './camera.interface';
import { ParseIntPipe } from '@nestjs/common';
import { cameraDto } from './camera.dto';

@Controller('/cameras/')
export class CameraController {
  constructor(private readonly CameraService: CameraService) { }

  @Get()
  getCamera(): Promise<iCamera[]> {
    return this.CameraService.getCameras();
  }

  @Get('/buscar')
  async getCameraNombre(
    @Query('nombre') nombre: string): Promise<any> {
    return this.CameraService.getCameraNombre(nombre);
  }
  
  @Get(':id')
  async getCameraId(
    @Param('id', //con el piper al pasar un id que no existe con letras te lanza un error.
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string): Promise<any> {
    return this.CameraService.getCameraId(id);

  }



  @Post()
  create(@Body() cameraDto: cameraDto): Promise<any> {
    return this.CameraService.addCamera(cameraDto);
  }

  @Put(':id')
  @HttpCode(204) //no devuelve la respuesta pero te dice que esta todo ok
  updateCameraId(@Param('id') id: string, @Body() body): Promise<void> {
    return this.CameraService.updateCameraId(id, body)
  }

  @Delete(':id')
  deleteCameraId(@Param('id',
    new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
  )

  id: string) {
    return this.CameraService.deleteCameraId(id);
  }
}
