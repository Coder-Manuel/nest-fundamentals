import { Test, TestingModule } from '@nestjs/testing';
import { CongregantsService } from './congregants.service';

describe('CongregantsService', () => {
  let service: CongregantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CongregantsService],
    }).compile();

    service = module.get<CongregantsService>(CongregantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
