import { Test, TestingModule } from "@nestjs/testing";
import { CameraService } from "./camera.service";
import { iCamera } from "./camera.interface";
import { NotFoundException } from '@nestjs/common';

describe('CameraService', () => {
    let cameraService: CameraService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CameraService],
        }).compile();

        cameraService = module.get<CameraService>(CameraService);
    });

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
        } as unknown as Response);  // Aserción de tipo para satisfacer TypeScript

        // Llamar al método del servicio
        const response = await cameraService.getCameras();

        // Asegurarse de que la respuesta coincide con los datos mock
        expect(response).toEqual(result);
    });

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

        const response = await cameraService.getCameraId('11');
        expect(response).toEqual(result);
    });

    it('Lanza un error cuando el id no existe', async () => {
        const id = 'El id no existe'

        // Mock de la función fetch para una respuesta no exitosa
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: false,
        } as unknown as Response);

        await expect(cameraService.getCameraId(id)).rejects.toThrow(NotFoundException);
    });

    it('Retornnar una camara llamada por su nombre', async () => {
        const result: iCamera[] = [{
            id: "11",
            nombre: 'canon eos r10',
            marca: "Canon",
            descripcion: "La Canon EOS R5 es una cámara sin espejo de fotograma completo que ofrece 45 megapíxeles y excelente estabilización de imagen."
        }];

        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(result)  
        } as unknown as Response);  

        const response = await cameraService.getCameraNombre('canon eos r10');

        expect(response).toEqual(result);
    });

 })