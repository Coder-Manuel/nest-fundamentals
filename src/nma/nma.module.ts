import { Module } from '@nestjs/common';
import { NmaService } from './nma.service';
import { NmaController } from './nma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NAttendance } from './entities/nma-attendance.entity';

@Module({
  providers: [NmaService],
  controllers: [NmaController],
  imports: [TypeOrmModule.forFeature([NAttendance], 'prod')],
})
export class NmaModule {}
