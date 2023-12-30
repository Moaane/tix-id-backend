import { Movie } from '@prisma/client';

export class MovieEntity implements Movie {
  id: number;
  title: string;
  date: Date;
  time: Date;
  ticket: number;
  show: number;
  mallId: number;
  studioId: number;
  Showdate: Date;
  Showtime: Date;

  showStatus: number;
}
