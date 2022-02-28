import { Module } from '@nestjs/common';
import { NmaService } from './nma.service';
import { NmaController } from './nma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CongregantsModule } from 'src/congregants';
import { NAttendance, NCongregant, NUser } from './entities';
import { UsersModule } from 'src/users';
import { AttendanceModule } from 'src/attendance/attendance.module';

@Module({
  providers: [NmaService],
  controllers: [NmaController],
  imports: [
    TypeOrmModule.forFeature([NAttendance, NCongregant, NUser], 'prod'),
    CongregantsModule,
    UsersModule,
    AttendanceModule,
  ],
})
export class NmaModule {}
