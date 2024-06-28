import { Test, TestingModule } from "@nestjs/testing";
import { CameraController } from "./camera.controller"; 
import { CameraService } from "./camera.service"; 
import { iCamera } from "./camera.interface"; 


describe('CameraController', () => {
  let cameraController: CameraController; // Declaración de la variable para el controlador de cámaras
  let cameraService: CameraService; // Declaración de la variable para el servicio de cámaras

  // Configuración que se ejecuta antes de cada prueba
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CameraController],
      providers: [CameraService], 
    }).compile();

    cameraController = module.get<CameraController>(CameraController); // Obtención de la instancia del controlador de cámaras
    cameraService = module.get<CameraService>(CameraService); // Obtención de la instancia del servicio de cámaras
  });

  // Prueba para verificar que se retorna un array de cámaras
  it('retornar un array de camaras', async () => {
    const result: iCamera[] = [{
      id: "11",
      nombre: 'canon eos r10',
      marca: "Canon",
      descripcion: "La Canon EOS R5 es una cámara sin espejo de fotograma completo que ofrece 45 megapíxeles y excelente estabilización de imagen."
    }];

    // Mock del método getCameras del servicio
    jest.spyOn(cameraService, 'getCameras').mockResolvedValue(result);

    // Llamar al método del controlador
    const response = await cameraController.getCamera();

    expect(response).toEqual(result);
  });

  // Prueba para verificar que se retorna una cámara por su ID
  it('Retornnar una camara llamada por su id', async () => {
    const result: iCamera = {
      id: "11",
      nombre: 'canon eos r10',
      marca: "Canon",
      descripcion: "La Canon EOS R5 es una cámara sin espejo de fotograma completo que ofrece 45 megapíxeles y excelente estabilización de imagen."
    };

    // Mock del método getCameraId del servicio
    jest.spyOn(cameraService, 'getCameraId').mockResolvedValue(result);

    // Llamar al método del controlador
    const response = await cameraController.getCameraId('11');

    expect(response).toEqual(result);
  });

  // Prueba para verificar que se retorna una cámara por su nombre
  it('Retornnar una camara llamada por su nombre', async () => {
    const result: iCamera[] = [{
      id: "11",
      nombre: 'canon eos r10',
      marca: "Canon",
      descripcion: "La Canon EOS R5 es una cámara sin espejo de fotograma completo que ofrece 45 megapíxeles y excelente estabilización de imagen."
    }];

    // Mock del método getCameraNombre del servicio
    jest.spyOn(cameraService, 'getCameraNombre').mockResolvedValue(result);

    // Llamar al método del controlador
    const response = await cameraController.getCameraNombre('canon eos r10');

    expect(response).toEqual(result);
  });

  // Prueba para verificar que se agrega una cámara y luego se obtiene por nombre
  it('Debe agregar una cámara y luego obtenerla por nombre', async () => {
    // Objeto de cámara que pretendemos agregar
    const newCamera: any = {
      id: "11",
      nombre: 'canon eos r10',
      marca: "Canon",
      descripcion: "La Canon EOS R5 es una cámara sin espejo de fotograma completo que ofrece 45 megapíxeles y excelente estabilización de imagen."
    };

    // Mock del resultado de agregar la cámara
    jest.spyOn(cameraService, 'addCamera').mockResolvedValue(newCamera);

    // Llamamos al método para agregar la cámara en el controlador
    const response = await cameraController.create(newCamera);

    // Verificamos que la respuesta del método coincida con el objeto agregado
    expect(response).toEqual(newCamera);
  });

  // Prueba para verificar que se actualiza una cámara
  it('actualizar una camara', async () => {
    const updatedCamera: iCamera = {
      id: "11",
      nombre: 'nikon d560',
      marca: "nikon",
      descripcion: "camara nikon d560"
    };

    // Mock del método updateCameraId del servicio
    jest.spyOn(cameraService, 'updateCameraId').mockResolvedValue(updatedCamera);

    // Llamar al método del controlador
    const response = await cameraController.updateCameraId('11', updatedCamera);

    expect(response).toEqual(updatedCamera);
  });

  // Prueba para verificar que se elimina una cámara
  it('Debe eliminar una cámara existente', async () => {
    const deleteCamera: iCamera = {
      id: "1",
      nombre: 'canon eos r10',
      marca: "Canon",
      descripcion: "Descripción de la cámara Canon EOS R10"
    };

    // Mock del método deleteCameraId del servicio
    jest.spyOn(cameraService, 'deleteCameraId').mockImplementation(() => Promise.resolve());

    // Llamar al método del controlador
    await cameraController.deleteCameraId('1');

    // Verificar que el método deleteCamera haya sido llamado con el ID correcto
    expect(cameraService.deleteCameraId).toHaveBeenCalledWith('1');
  });
});
