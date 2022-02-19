import { Module } from '@nestjs/common';
import { HomeFellowshipService } from './home-fellowship.service';
import { HomeFellowshipController } from './home-fellowship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeFellowship } from './entities';

@Module({
  providers: [HomeFellowshipService],
  controllers: [HomeFellowshipController],
  imports: [TypeOrmModule.forFeature([HomeFellowship])],
})
export class HomeFellowshipModule {}
