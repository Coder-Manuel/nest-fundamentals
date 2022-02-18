import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users';
import { CongregantsModule } from './congregants/congregants.module';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(config, {
          autoLoadEntities: true,
        }),
    }),
    AuthModule,
    UsersModule,
    CongregantsModule,
    AttendanceModule,
  ],
})
export class AppModule {}
