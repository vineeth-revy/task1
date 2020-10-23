import { Test, TestingModule } from '@nestjs/testing';
import { SystemRolesResolver } from './system-roles.resolver';

describe('SystemRolesResolver', () => {
  let resolver: SystemRolesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemRolesResolver],
    }).compile();

    resolver = module.get<SystemRolesResolver>(SystemRolesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
