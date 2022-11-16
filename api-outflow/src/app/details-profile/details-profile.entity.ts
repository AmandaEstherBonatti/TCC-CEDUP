import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { UsersEntity } from "../user/users.entity";

@Entity({ name: 'details_profile_entity' })
export class DetailsProfileEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    hourlyRate: string;

    @Column({ length: '3000' })
    description: string;

    @Column({ length: '3000' })
    specialty: string;

    @OneToOne(() => UsersEntity, {
        cascade: ['insert', 'update', 'remove'],
        orphanedRowAction: 'delete'
    })
    @JoinColumn()
    User: UsersEntity;
}