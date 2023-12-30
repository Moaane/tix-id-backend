import { OmitType, PartialType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto {
  email: string;
  password: string;
  username: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  email?: string;
  password?: string;
  username?: string;
  refreshToken?: string;
}
