import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities';
import { CongregantsModule } from 'src/congregants';

@Module({
  providers: [DepartmentsService],
  controllers: [DepartmentsController],
  imports: [TypeOrmModule.forFeature([Department]), CongregantsModule],
})
export class DepartmentsModule {}
