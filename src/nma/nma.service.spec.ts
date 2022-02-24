import { Test, TestingModule } from '@nestjs/testing';
import { NmaService } from './nma.service';

describe('NmaService', () => {
  let service: NmaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NmaService],
    }).compile();

    service = module.get<NmaService>(NmaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
