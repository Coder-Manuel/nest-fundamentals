import { Test, TestingModule } from '@nestjs/testing';
import { NmaController } from './nma.controller';

describe('NmaController', () => {
  let controller: NmaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NmaController],
    }).compile();

    controller = module.get<NmaController>(NmaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
