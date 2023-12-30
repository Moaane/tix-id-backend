import { OmitType, PartialType } from '@nestjs/mapped-types';
import { MovieEntity } from '../entities/movie.entity';

export class CreateMovieDto extends OmitType(MovieEntity, ['id']) {
  title: string;
  date: Date;
  time: Date;
  ticket: number;
  show: number;
  mallId: number;
  studioId: number;
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  title?: string;
  date?: Date;
  time?: Date;
  ticket?: number;
  show?: number;
  mallId?: number;
  studioId?: number;
}
