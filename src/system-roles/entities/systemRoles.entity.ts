import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
//import { Roles } from "./roles.entity";

@Entity()
export class SystemRolesEntity {

    @PrimaryGeneratedColumn()
    id: number | string;

    @Column()
    code: string;

    @Column()
    description: string;

    @Column({default:false})
    status: boolean;
}