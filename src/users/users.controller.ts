import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto, @Res() res: Response) {
    const user = await this.usersService.create(body);
    return {
      data: user,
      message: 'Successfully created user',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      data: users,
      message: 'Successfully find all users',
      statusCode: HttpStatus.OK,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    return {
      data: user,
      message: 'Successfully find user',
      statusCode: HttpStatus.OK,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() Body: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.update(id, Body);
    return {
      data: updatedUser,
      message: 'Successfully update user',
      statusCode: HttpStatus.OK,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
    return {
      message: 'Successfully deleted user',
      statusCode: HttpStatus.OK,
    };
  }
}
