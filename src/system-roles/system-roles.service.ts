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

        //console.log(complete_role);
        
        let permission = complete_role.permissions.map((perm) => {
            return this.permissionConvert(perm,system_array);
        });

        let response: ResponseRoleDTO = {
            id: complete_role.id,
            roleId: complete_role.role.id.toString(),
            description: complete_role.role.description,
            code: complete_role.role.code,
            permission: permission.flat()
        }
        //console.log(response);

        return response;
    }

    async findall(limit: number,offset: number): Promise<ResponseRoleDTO[]> {
        
        //let p: Roles[] = await this.role.find({relations:["role"]});
        let system_array: SystemEntity[] = await this.system.find();
        
        let p = await this.role.find({
            relations:["role"],
            take: limit,
            skip: limit*offset
        });

        let responseArray = p.map(val => {
            
            let perm: string[] = (val.permissions.map(value => {
                return this.permissionConvert(value,system_array)
            })).flat();
            let response: ResponseRoleDTO = {
                id: val.id.toString(),
                roleId: val.role.id,
                description: val.role.description,
                code: val.role.code,
                permission: perm
            }
            return response;
        })

        return Promise.resolve(responseArray);
    }

    permissionConvert(perm,system_array: SystemEntity[]): string[] {
        
        let {name} = system_array.find((ob) => ob.id == perm.moduleId);
        return perm.access.map((m) =>m.concat(name));
    }
}
