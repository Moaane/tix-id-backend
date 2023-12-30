import { Module } from '@nestjs/common';
import { MallsService } from './malls.service';
import { MallsController } from './malls.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MallsController],
  providers: [MallsService, PrismaService],
})
export class MallsModule {}
