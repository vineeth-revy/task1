import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemEntity } from 'src/system/entities/system.entity';
import { Repository } from 'typeorm';
import { createRoleDTO } from './dto/createrole.DTO';
import { ResponseRoleDTO } from './dto/responserole.DTO';
import { Roles } from './entities/roles.entity';
import { SystemRolesEntity } from './entities/systemRoles.entity';

@Injectable()
export class SystemRolesService {

    constructor(
        @InjectRepository(SystemEntity) private system:Repository<SystemEntity>,
        @InjectRepository(SystemRolesEntity) private systroles: Repository<SystemRolesEntity>,
        @InjectRepository(Roles) private role: Repository<Roles>
    ) {}

    async create(role: createRoleDTO): Promise<ResponseRoleDTO> {

        let new_role = {code: role.code,description:role.description}
        new_role = await this.systroles.save(new_role);
        let complete_role = await this.role.save({permissions:role.permission,role:new_role});

        let system_array: SystemEntity[] = await this.system.find();
    
        return this.permissionConvert(complete_role,system_array);    
    }

    async findAll(limit: number,offset: number): Promise<ResponseRoleDTO[]> {
        //let p: Roles[] = await this.role.find({relations:["role"]});
        let system_array: SystemEntity[] = await this.system.find();
        
        let p = await this.role.find({
            relations:["role"],
            take: limit,
            skip: limit*offset
        });

        let responseArray = p.map(val => this.permissionConvert(val,system_array))

        return responseArray;
    }

    async findOne(id: number | string): Promise<ResponseRoleDTO> {
        
        let p = await this.role.findOne(id,{relations:["role"]});

        let system_array = await this.system.find();
        
        return this.permissionConvert(p,system_array);  
    }

    permissionConvert(val,system_array: SystemEntity[]): ResponseRoleDTO {
        
        let permission = val.permissions;
        let new_perm = permission.map((perm) => {
            let {name} = system_array.find((ob) => ob.id == perm.moduleId);
            return perm.access.map((m) =>m.concat(name));
        })
        
        let response: ResponseRoleDTO = {
            id: val.id.toString(),
            roleId: val.role.id,
            description: val.role.description,
            code: val.role.code,
            permission: new_perm.flat()
        }

        return response;
    }
}
