import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORMCONFIG } from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users';
import { CongregantsModule } from './congregants/congregants.module';
import { AttendanceModule } from './attendance/attendance.module';
import { HomeFellowshipModule } from './home-fellowship/home-fellowship.module';
import { DepartmentsModule } from './departments/departments.module';
import { NmaModule } from './nma/nma.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ORMCONFIG.postgres,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forRoot({
      ...ORMCONFIG.mysql,
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    CongregantsModule,
    AttendanceModule,
    HomeFellowshipModule,
    DepartmentsModule,
    NmaModule,
  ],
})
export class AppModule {}
