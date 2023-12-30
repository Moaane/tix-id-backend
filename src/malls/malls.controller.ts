import { Controller } from '@nestjs/common';
import { MallsService } from './malls.service';

@Controller('malls')
export class MallsController {
  constructor(private readonly mallsService: MallsService) {}
}
