import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // async create(body: CreateMovieDto): Promise<Movie> {
  //   const studio = await this.studioService.findOne(body.studioId);
  //   return await this.prisma.movie.create({
  //     data: { ...body, ticket: studio.seat },
  //   });
  // }

  async findAll(): Promise<Movie[]> {
    return await this.prisma.movie.findMany();
  }

  async findAllByMall(mallId: number): Promise<Movie[]> {
    return await this.prisma.movie.findMany({
      where: { mallId },
    });
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async update(id: number, body: UpdateMovieDto): Promise<Movie> {
    await this.findOne(id);
    return await this.prisma.movie.update({
      where: { id },
      data: body,
    });
  }

  async remove(id: number): Promise<Movie> {
    await this.findOne(id);
    return await this.prisma.movie.delete({
      where: { id },
    });
  }
}
