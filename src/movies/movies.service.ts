import { Injectable, NotFoundException } from '@nestjs/common';
import { iMovie } from './movies.interface';
import { MoviesDto } from './movies.dto';

const base_url: string = 'http://localhost:3010/movies/'

@Injectable()
export class MoviesService {
  async buscarTodo(): Promise <iMovie[]>{
    const res = await fetch (base_url);
    const movies = await res.json();
    return movies;
  }

  async buscarUno (id: string): Promise <iMovie> {
    try {
      const res = await fetch (base_url + id);
      const movies = await res.json();
      return movies;
    } catch (error) {
      throw new NotFoundException (`movie con id ${id} no existe`);
    }
  }
}


