import { BadRequestException } from '@nestjs/common';
import { Resolver,Query, Mutation, Args } from '@nestjs/graphql';
import { createRoleDTO } from './dto/createrole.DTO';
import { ResponseRoleDTO } from './dto/responserole.DTO';
import { permission } from './enum/permission.enum';
import { SystemRolesService } from './system-roles.service';


@Resolver()
export class SystemRolesResolver {
    

    constructor(
        private systemservice: SystemRolesService
    ){}

    @Query()
    async allRoles(@Args('limit') limit:number=0,@Args('offset') offset:number=0): Promise<ResponseRoleDTO[]> {
        return await this.systemservice.findall(limit,offset);
    }

    @Mutation()
    async createRole(@Args('role') role: createRoleDTO): Promise<ResponseRoleDTO> {
        
        //To remove object[ null type ] problem
        let obj = new createRoleDTO();
        obj = JSON.parse(JSON.stringify(role));
        
        if(!obj.permission.length)
        {
            throw new BadRequestException("Array cannot be null")
        }
   
        return await this.systemservice.create(obj);
    }
}
