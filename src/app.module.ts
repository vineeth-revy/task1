import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Roles } from './system-roles/entities/roles.entity';
import { SystemRolesEntity } from './system-roles/entities/systemRoles.entity';
import { SystemRolesModule } from './system-roles/system-roles.module';
import { SystemEntity } from './system/entities/system.entity';
import { SystemModule } from './system/system.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "test",
      entities:[SystemEntity,Roles,SystemRolesEntity],
      //synchronize: true
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
      path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    SystemModule,
    SystemRolesModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
