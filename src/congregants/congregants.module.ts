import { Module } from '@nestjs/common';
import { CongregantsService } from './congregants.service';
import { CongregantsController } from './congregants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Congregant } from './entities';

@Module({
  providers: [CongregantsService],
  controllers: [CongregantsController],
  imports: [TypeOrmModule.forFeature([Congregant])],
})
export class CongregantsModule {}
