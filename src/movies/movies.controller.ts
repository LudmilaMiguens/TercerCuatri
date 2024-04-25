import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { iMovie } from './movies.interface';


@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async buscarTodo(): Promise <iMovie[]> {
    return this.moviesService.buscarTodo();
  }

  @Get(':id')
   async getMovieById(@Res() response, @Param('id') id: string){
    const responseFromServise = await this.moviesService.buscarUno(id);
    if (responseFromServise && Object.keys(responseFromServise).length > 0){
      return response.status(HttpStatus.OK).json(responseFromServise);
    } else
    return response
    .status(HttpStatus.NOT_FOUND)
    .json({error: "La pelicula no existe"});
  }
}
