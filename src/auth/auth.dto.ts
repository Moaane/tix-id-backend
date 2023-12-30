import { OmitType, PartialType } from '@nestjs/mapped-types';

export class AuthDto {
  username: string;
  password: string;
}
