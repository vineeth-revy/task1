import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SystemEntity {

    @PrimaryGeneratedColumn()
    id: string | number;

    @Column()
    name: string;
}