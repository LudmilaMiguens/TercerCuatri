import { Test, TestingModule } from "@nestjs/testing"; 
import { CameraService } from "./camera.service";
import { iCamera } from "./camera.interface"; 
import { NotFoundException } from '@nestjs/common'; 
import { cameraDto } from "./camera.dto"; 


describe('CameraService', () => {
    let cameraService: CameraService; // Declaración de la variable para el servicio de cámaras

    // Configuración que se ejecuta antes de cada prueba
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CameraService], // Proveedores del módulo de pruebas
        }).compile();

        cameraService = module.get<CameraService>(CameraService); // Obtención de la instancia del servicio de cámaras
    });

    // Prueba para verificar que se retorna un array de cámaras
    it('Retornna un array de camaras', async () => {
        const result: iCamera[] = [{
            id: "11",
            nombre: 'canon eos r10',
            marca: "Canon",
            descripcion: "La Canon EOS R5 es una cámara sin espejo de fotograma completo que ofrece 45 megapíxeles y excelente estabilización de imagen."
        }]; 

        // Espiar la función fetch global y mockear su valor resuelto
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(result)  // Mock del método json de la respuesta
        } as unknown as Response);  
        // Llamar al método del servicio
        const response = await cameraService.getCameras();

        // Asegurarse de que la respuesta coincide con los datos mock
        expect(response).toEqual(result);
    });

    // Prueba para verificar que se retorna una cámara por su ID si existe
    it('Retornnar una camara llamada por su id que si existe', async () => {
        const result: iCamera = {
            id: "11",
            nombre: 'canon eos r10',
            marca: "Canon",
            descripcion: "La Canon EOS R5 es una cámara sin espejo de fotograma completo que ofrece 45 megapíxeles y excelente estabilización de imagen."
        };

        // Mock de la función fetch para una respuesta exitosa
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(result)
        } as unknown as Response);

        // Llamar al método del servicio
        const response = await cameraService.getCameraId('11');
        expect(response).toEqual(result);
    });

    // Prueba para verificar que se lanza un error cuando el ID no existe
    it('Lanza un error cuando el id no existe', async () => {
        const id = 'El id no existe';

        // Mock de la función fetch para una respuesta no exitosa
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: false,
        } as unknown as Response);

        // Asegurarse de que se lanza la excepción NotFoundException
        await expect(cameraService.getCameraId(id)).rejects.toThrow(NotFoundException);
    });

    // Prueba para verificar que se retorna una cámara por su nombre
    it('Retornnar una camara llamada por su nombre', async () => {
        const result: iCamera[] = [{
            id: "11",
            nombre: 'canon eos r10',
            marca: "Canon",
            descripcion: "La Canon EOS R5 es una cámara sin espejo de fotograma completo que ofrece 45 megapíxeles y excelente estabilización de imagen."
        }];

        // Mock de la función fetch para una respuesta exitosa
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(result)
        } as unknown as Response);

        // Llamar al método del servicio
        const response = await cameraService.getCameraNombre('canon eos r10');

        expect(response).toEqual(result);
    });

    // Prueba para verificar que se agrega una cámara
    it('Agregar una camara', async () => {
        const newcameraDto: cameraDto = {
            nombre: 'canon eos r10',
            marca: "Canon",
            descripcion: "La Canon EOS R5 es una cámara sin espejo de fotograma completo que ofrece 45 megapíxeles y excelente estabilización de imagen.",
            imagen: undefined
        };
        const newIdCamera = '123'; // ID de la nueva cámara
        const newCamera: iCamera = {
            id: newIdCamera,
            nombre: newcameraDto.nombre,
            marca: newcameraDto.marca,
            descripcion: newcameraDto.descripcion
        };

        // Mock de la función fetch para una respuesta exitosa
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(newCamera)
        } as unknown as Response);

        // Mock del método getCameras para devolver la nueva cámara
        jest.spyOn(cameraService, 'getCameras').mockResolvedValue([newCamera]);

        // Llamar al método del servicio
        const response = await cameraService.addCamera(newcameraDto);

        expect(response).toEqual(newCamera);
    });

    // Prueba para verificar que se modifica una cámara
    it('Modificar  una camara', async () => {
        const camera = {
            id: '11',
            nombre: 'canon eos r10',
            marca: "Canon",
            descripcion: "La Canon EOS R5 es una cámara sin espejo de fotograma completo que ofrece 45 megapíxeles y excelente estabilización de imagen.",
        };
        const modificarCamera = {
            id: '11',
            nombre: 'canon eos r11',
            marca: "Canon",
            descripcion: "La Canon EOS R11 es una cámara sin espejo de fotograma completo que ofrece 45 megapíxeles y excelente estabilización de imagen."
        };

        const cameraModificada = {
            ...modificarCamera,
            id: '11'
        };

        // Mock del método getCameraId para devolver la cámara original
        jest.spyOn(CameraService.prototype, 'getCameraId').mockResolvedValue(camera);

        // Mock de la función fetch para una respuesta exitosa
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(cameraModificada)
        } as unknown as Response);

        // Llamar al método del servicio
        const response = await cameraService.updateCameraId('11', modificarCamera);

        expect(response).toEqual(cameraModificada);
        expect(jest.spyOn(CameraService.prototype, 'getCameraId')).toHaveBeenCalledWith('11');
    });

    // Prueba para verificar que se elimina una cámara
    it('Eliminar una camara', async () => {
        const mensaje = ('Camera eliminada'); // Mensaje de confirmación
        // Mock de la función fetch para una respuesta exitosa
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mensaje),
        } as unknown as Response);

        // Llamar al método del servicio
        const response = await cameraService.deleteCameraId('11');

        expect(response).toEqual(mensaje);
    });
});
