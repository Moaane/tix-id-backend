import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto } from './dto/movie.dto';
import { Movie } from '@prisma/client';
import { MallsService } from 'src/malls/malls.service';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateMovieDto): Promise<Movie> {
    return await this.prisma.movie.create({ data: body });
  }

  async findAll(): Promise<Movie[]> {
    return await this.prisma.movie.findMany();
  }

  async findAllByMall(id: number) {
    return await this.prisma.theatreMovie.findMany({
      where: { movieId: id },
      include: {
        Mall: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.movie.findUnique({ where: { id } });
  }

  async findOneByAllMall(id: number) {
    return await this.prisma.movie.findMany({
      where: { id },
      include: {
        theatres: {
          include: {
            Theatre: {
              include: {
                Mall: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
