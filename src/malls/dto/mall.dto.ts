import { OmitType, PartialType } from '@nestjs/mapped-types';
import { MallEntity } from '../entities/mall.entity';

export class CreateMallDto extends OmitType(MallEntity, ['id']) {
  name: string;
  latitude: string;
  longitude: string;
}

export class UpdateMallDto extends PartialType(CreateMallDto) {
  name?: string;
  latitude?: string;
  longitude?: string;
}
