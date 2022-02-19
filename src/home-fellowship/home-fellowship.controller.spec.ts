import { Test, TestingModule } from '@nestjs/testing';
import { HomeFellowshipController } from './home-fellowship.controller';

describe('HomeFellowshipController', () => {
  let controller: HomeFellowshipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeFellowshipController],
    }).compile();

    controller = module.get<HomeFellowshipController>(HomeFellowshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
