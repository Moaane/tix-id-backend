import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { MallsModule } from './malls/malls.module';
import { SeatsModule } from './seats/seats.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    MallsModule,
    SeatsModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
