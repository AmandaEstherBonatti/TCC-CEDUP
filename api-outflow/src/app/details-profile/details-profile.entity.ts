import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'datetime' })
    deletedAt: Date;
}