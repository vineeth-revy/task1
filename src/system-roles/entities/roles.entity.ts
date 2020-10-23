import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreatePermission } from "../interface/createpermission.interface";
import { SystemRolesEntity } from "./systemRoles.entity";

@Entity()
export class Roles {

    @PrimaryGeneratedColumn()
    id: string | number;

    @Column({type:"jsonb"})
    permissions: CreatePermission[];

    @OneToOne(type => SystemRolesEntity)
    @JoinColumn()
    role: SystemRolesEntity;
}

