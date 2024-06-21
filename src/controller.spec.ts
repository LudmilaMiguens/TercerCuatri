import { Test, TestingModule } from "@nestjs/testing";
import { CameraController } from "./camera.controller";
import { CameraService } from "./camera.service";
import { iCamera } from "./camera.interface";

describe('CameraController', () => {
  let cameraController: CameraController;
  let cameraService: CameraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CameraController],
      providers: [CameraService],
    }).compile();

    cameraController = module.get<CameraController>(CameraController);
    cameraService = module.get<CameraService>(CameraService);
  });

  it('retornar un array de camaras', async () => {
    const result: iCamera[] = [{
      id: "11",
      nombre: 'canon eos r10',
      marca: "Canon",
      descripcion: "La Canon EOS R5 es una cámara sin espejo de fotograma completo que ofrece 45 megapíxeles y excelente estabilización de imagen."
    }];

    jest.spyOn(cameraService, 'getCameras').mockResolvedValue(result);

    const response = await cameraController.getCamera();

    expect(response).toEqual(result);
  });

  describe('getCameraId', () => {
    it('Retornnar una camara llamada por su id', async () => {
      const result: iCamera = {
        id: "11",
        nombre: 'canon eos r10',
        marca: "Canon",
        descripcion: "La Canon EOS R5 es una cámara sin espejo de fotograma completo que ofrece 45 megapíxeles y excelente estabilización de imagen."
      };

      jest.spyOn(cameraService, 'getCameraId').mockResolvedValue(result);

      const response = await cameraController.getCameraId('11');

      expect(response).toEqual(result);
    });
  });

  describe('getCameraNombre', () => {
    it('Retornnar una camara llamada por su nombre', async () => {
      const result: iCamera[] = [{
        id: "11",
        nombre: 'canon eos r10',
        marca: "Canon",
        descripcion: "La Canon EOS R5 es una cámara sin espejo de fotograma completo que ofrece 45 megapíxeles y excelente estabilización de imagen."
      }];

      jest.spyOn(cameraService, 'getCameraNombre').mockResolvedValue(result);

      const response = await cameraController.getCameraNombre('canon eos r10');

      expect(response).toEqual(result);
    });
  });

  describe('addCamera', () => {
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
  });
  
    describe('updateCameraId', () => {
      it('actualizar una camara', async () => {
        const updatedCamera: iCamera = {
          id: "11",
          nombre: 'nikon d560',
          marca: "nikon",
          descripcion: "camara nikon d560"
        };

        jest.spyOn(cameraService, 'updateCameraId').mockResolvedValue(updatedCamera);
  
        const response = await cameraController.updateCameraId('1', updatedCamera);
  
        expect(response).toEqual(updatedCamera);
      });
      });

      describe('deleteCameraId', () => {
        it('Debe eliminar una cámara existente', async () => {
          const deleteCamera: iCamera = {
            id: "1",
            nombre: 'canon eos r10',
            marca: "Canon",
            descripcion: "Descripción de la cámara Canon EOS R10"
          };
    
          jest.spyOn(cameraService, 'deleteCameraId').mockImplementation(() => Promise.resolve());
    
          await cameraController.deleteCameraId('1');
    
          // Verificar que el método deleteCamera haya sido llamado con el ID correcto
          expect(cameraService.deleteCameraId).toHaveBeenCalledWith('1');
        });
    });
     });
