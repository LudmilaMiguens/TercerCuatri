import {IsString, IsNumber, Min, Max} from 'class-validator'

export class MoviesDto{
    @IsString()
    title: string;
    @IsNumber()
    year: number;
    @IsString()
    director: string;
    @IsNumber()
    @Min(60)
    @Max(210)
    duration: number;
    poster: ImageData;
    genero: string[];
    @IsNumber()
    @Min(1)
    @Max(10)  
    rate: number;
}