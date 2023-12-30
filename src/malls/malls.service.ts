import { Injectable, NotFoundException } from '@nestjs/common';
import { Mall } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMallDto, UpdateMallDto } from './dto/mall.dto';

@Injectable()
export class MallsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateMallDto): Promise<Mall> {
    return await this.prisma.mall.create({ data: body });
  }

  async findAll(): Promise<Mall[]> {
    return await this.prisma.mall.findMany();
  }

  async findOne(id: number): Promise<Mall> {
    const mall = await this.prisma.mall.findUnique({
      where: { id },
    });
    if (!mall) throw new NotFoundException('Mall not found');
    return mall;
  }

  async findByName(name: string): Promise<Mall> {
    return await this.prisma.mall.findFirst({ where: { name } });
  }

  async update(id: number, body: UpdateMallDto): Promise<Mall> {
    await this.findOne(id);
    return await this.prisma.mall.update({
      where: { id },
      data: body,
    });
  }

  async remove(id: number): Promise<Mall> {
    await this.findOne(id);
    return await this.prisma.mall.delete({ where: { id } });
  }
}
