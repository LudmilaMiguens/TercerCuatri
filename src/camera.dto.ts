import { IsString, IsUrl, Matches, } from "class-validator";

//Define el tipo para la Url
type URLString = string & { __URL__: never };

export class cameraDto{ 
    @Matches(/^[a-z0-9\s]*$/, { message: "El nombre solo debe contener letras minúsculas, números y espacios" })
    @IsString()
    nombre: string;
    @IsString()
    marca: string;
    @IsUrl()
    imagen: URLString;
    @IsString()
    descripcion: string;
}