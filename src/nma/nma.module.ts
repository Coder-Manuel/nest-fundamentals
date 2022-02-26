import { Module } from '@nestjs/common';
import { NmaService } from './nma.service';
import { NmaController } from './nma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CongregantsModule } from 'src/congregants';
import { NAttendance, NCongregant } from './entities';

@Module({
  providers: [NmaService],
  controllers: [NmaController],
  imports: [
    TypeOrmModule.forFeature([NAttendance, NCongregant], 'prod'),
    CongregantsModule,
  ],
})
export class NmaModule {}
