import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemEntity } from 'src/system/entities/system.entity';
import { Roles } from './entities/roles.entity';
import { SystemRolesEntity } from './entities/systemRoles.entity';
import { SystemRolesResolver } from './system-roles.resolver';
import { SystemRolesService } from './system-roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    SystemEntity,
    SystemRolesEntity,
    Roles
  ])],
  providers: [SystemRolesResolver, SystemRolesService]
})
export class SystemRolesModule {}
