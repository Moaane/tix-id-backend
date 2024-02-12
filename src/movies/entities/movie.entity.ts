import { Movie } from '@prisma/client';

export class MovieEntity implements Movie {
  id: number;
  title: string;
  director: string;
  genre: string;
  duration: number;
}
