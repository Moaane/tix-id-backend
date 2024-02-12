import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('create')
  async create(@Body() body: CreateMovieDto) {
    const newMovie = await this.moviesService.create(body);
    return {
      data: newMovie,
      message: 'Successfully created movie',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get('find-all')
  async findAll(@Query() mallId?: number) {
    if (mallId) return await this.moviesService.findAllByMall(mallId);
    const movies = await this.moviesService.findAll();
    return {
      data: movies,
      message: 'Successfully find all movies',
      statusCode: HttpStatus.OK,
    };
  }

  @Get('find/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const movie = await this.moviesService.findOne(id);
    return {
      data: movie,
      message: 'Successfully find movie',
      statusCode: HttpStatus.OK,
    };
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateMovieDto,
  ) {
    const updatedMovie = await this.update(id, body);
    return {
      data: updatedMovie,
      message: 'Successfully updated movie',
      statusCode: HttpStatus.OK,
    };
  }
}
