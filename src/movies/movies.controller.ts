import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Res,
  HttpStatus,
  Query,
  HttpCode,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { Response } from 'express';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // @Post()
  // @HttpCode(204)
  // async create(@Body() Body: CreateMovieDto, @Res() res: Response) {
  //   const newMovie = await this.moviesService.create(Body);
  //   return newMovie;
  // }

  @Get()
  async findAll(@Query('mall') mallId?: number, @Res() res?: Response) {
    if (mallId) {
      const movies = await this.moviesService.findAllByMall(mallId);
      return res.status(HttpStatus.OK).json({
        data: movies,
        message: 'Successfully find all movies',
        statusCode: HttpStatus.OK,
      });
    }
    const movies = await this.moviesService.findAll();
    return res.status(HttpStatus.OK).json({
      data: movies,
      message: 'Successfully find all movies',
      statusCode: HttpStatus.OK,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateMovieDto) {
    return this.moviesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.remove(id);
  }
}
