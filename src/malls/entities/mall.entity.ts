import { Mall } from '@prisma/client';

export class MallEntity implements Mall {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}
