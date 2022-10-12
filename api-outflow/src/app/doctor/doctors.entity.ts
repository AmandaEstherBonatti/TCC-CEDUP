import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AddressEntity } from "../address/address.entity";
import { Gender } from "../client/enum/gender.enum";
import { UsersEntity } from "../user/users.entity";
import { KindOfDoctor } from "./enum/kind_of_doctor.enum";
import { MainExpectation } from "./enum/main-expectation.enum";
import { TimeExperience } from "./enum/time-experience.enum";

@Entity({ name: 'doctors_entity' })
export class DoctorsEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    lastName: string

    @Column()
    gender: Gender;

    @Column()
    phoneNumber: string;

    @Column()
    cpf: string;

    @Column()
    timeExperience: TimeExperience;

    @Column()
    mainExpectation: MainExpectation;

    @Column()
    kindOfDoctor: KindOfDoctor;

    @Column({ nullable: true })
    crp: string;

    @OneToOne(() => AddressEntity, {
        cascade: ['insert', 'update', 'remove'],
        orphanedRowAction: 'delete',
        eager: true,
        nullable: true
    })
    @JoinColumn()
    Address: AddressEntity;

    @OneToOne(() => UsersEntity, {
        cascade: ['insert', 'update', 'remove'],
        orphanedRowAction: 'delete',
        eager: true
    })
    @JoinColumn()
    User: UsersEntity;

}