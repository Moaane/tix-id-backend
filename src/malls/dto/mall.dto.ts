import { OmitType, PartialType } from '@nestjs/mapped-types';
import { MallEntity } from '../entities/mall.entity';

export class CreateMallDto extends OmitType(MallEntity, ['id']) {
  name: string;
  address: string;
  location: string[];
}

export class UpdateMallDto extends PartialType(CreateMallDto) {
  name?: string;
  address?: string;
  location?: string[];
}
