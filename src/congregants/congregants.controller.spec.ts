import { Test, TestingModule } from '@nestjs/testing';
import { CongregantsController } from './congregants.controller';

describe('CongregantsController', () => {
  let controller: CongregantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CongregantsController],
    }).compile();

    controller = module.get<CongregantsController>(CongregantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
