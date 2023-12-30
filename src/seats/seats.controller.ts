import { Body, Controller, Post } from '@nestjs/common';
import { SeatsService } from './seats.service';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Post('create')
  async createSeats(
    @Body() seatData: { rows: number; columns: number; theatreId: number },
  ) {
    const { rows, columns, theatreId } = seatData;
    return await this.seatsService.createSeats(rows, columns, theatreId);
  }
}
