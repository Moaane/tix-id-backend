import { OmitType, PartialType } from '@nestjs/mapped-types';
import { MovieEntity } from '../entities/movie.entity';

export class CreateMovieDto extends OmitType(MovieEntity, ['id']) {
  title: string;
  director: string;
  duration: number;
  genre: string;
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  title?: string;
  director?: string;
  duration?: number;
  genre?: string;
}
