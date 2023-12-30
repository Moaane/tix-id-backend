import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeatsService {
  constructor(private readonly prisma: PrismaService) {}

  async createSeats(rows: number, columns: number, theatreId: number) {
    const seatsToCreate = [];

    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= columns; j++) {
        seatsToCreate.push({
          row: String.fromCharCode(64 + i), // Menggunakan representasi huruf (A, B, C, dst.) untuk baris
          column: j,
          theatreId,
        });
      }
    }

    return await this.prisma.seat.createMany({
      data: seatsToCreate,
    });
  }
}
