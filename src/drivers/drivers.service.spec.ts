import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DriversService } from './drivers.service';
import { Driver } from './driver.entity';
import { Repository } from 'typeorm';

describe('DriversService', () => {
  let service: DriversService;
  let repo: Repository<Driver>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriversService,
        {
          provide: getRepositoryToken(Driver),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DriversService>(DriversService);
    repo = module.get<Repository<Driver>>(getRepositoryToken(Driver));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call find on the repository when findAll is called', async () => {
    const mockDrivers = [{ id: 1, name: 'Alice', available: true }];
    jest.spyOn(repo, 'find').mockResolvedValue(mockDrivers as any);
    const result = await service.findAll();
    expect(result).toEqual(mockDrivers);
  });
});
