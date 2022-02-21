import { Test, TestingModule } from '@nestjs/testing';
import { HomeFellowshipService } from './home-fellowship.service';

describe('HomeFellowshipService', () => {
  let service: HomeFellowshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeFellowshipService],
    }).compile();

    service = module.get<HomeFellowshipService>(HomeFellowshipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
