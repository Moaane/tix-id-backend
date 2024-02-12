import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MallsService } from './malls.service';
import { CreateMallDto, UpdateMallDto } from './dto/mall.dto';

@Controller('malls')
export class MallsController {
  constructor(private readonly mallsService: MallsService) {}

  @Post('create')
  async create(@Body() body: CreateMallDto) {
    const newMall = await this.mallsService.create(body);
    return {
      data: newMall,
      message: 'Successfully created mall',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get('find-all')
  async findAll() {
    const malls = await this.mallsService.findAll();
    return {
      data: malls,
      message: 'Successfully find all malls',
      statusCode: HttpStatus.OK,
    };
  }

  @Get('find/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const mall = await this.mallsService.findOne(id);
    if (!mall) throw new NotFoundException('Mall not found');
    return {
      data: mall,
      message: 'Successfully find mall',
      statusCode: HttpStatus.OK,
    };
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateMallDto,
  ) {
    const updatedMall = await this.mallsService.update(id, body);
    return {
      data: updatedMall,
      message: 'Successfully updated mall',
      statusCode: HttpStatus.OK,
    };
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const deletedMall = await this.mallsService.remove(id);
    return {
      message: 'Successfully deleted mall',
      statusCode: HttpStatus.OK,
    };
  }
}
