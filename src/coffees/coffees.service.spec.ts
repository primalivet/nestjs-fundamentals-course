import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CoffeesService', () => {
  let prisma: PrismaService;
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, CoffeesService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    service = module.get<CoffeesService>(CoffeesService);
  });

  it('', async () => {
    prisma.coffee.findMany = jest.fn().mockReturnValue([]);
    const found = await service.findAll({ limit: 1, offset: 1 }, true);
    const wanted = [];

    expect(prisma.coffee.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.coffee.findMany).toHaveBeenCalledWith({
      skip: 1,
      take: 1,
      include: { flavors: true },
    });
    expect(found).toEqual(wanted);
  });

});
