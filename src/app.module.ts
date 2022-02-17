import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users';

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
  ],
})
export class AppModule {}
