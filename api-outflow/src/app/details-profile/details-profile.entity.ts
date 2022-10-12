import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LangugesEntity } from "../languages/languages.entity";
import { SpecialtyEntity } from "../specialty/specialty.entity";
import { UsersEntity } from "../user/users.entity";

@Entity({ name: 'details_profile_entity' })
export class DetailsProfileEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    hourlyRate: string;

    @Column()
    description: string;

    @OneToMany(() => LangugesEntity, (languages) => languages.DetailsProfile, { nullable: true })
    Languages: LangugesEntity[];

    @OneToMany(() => SpecialtyEntity, (specialty) => specialty.DetailsProfile, { nullable: true })
    Specialtys: SpecialtyEntity[];

    @OneToOne(() => UsersEntity, {
        cascade: ['insert', 'update', 'remove'],
        orphanedRowAction: 'delete',
        eager: true
    })
    @JoinColumn()
    User: UsersEntity;
}