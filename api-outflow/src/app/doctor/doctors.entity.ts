import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "../client/enum/gender.enum";
import { FeedPostEntity } from "../feed/feeds.entity";
import { HistoricEntity } from "../historic/historic.entity";
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


    @OneToOne(() => UsersEntity, {
        cascade: ['insert', 'update', 'remove'],
        orphanedRowAction: 'delete',
        eager: true
    })
    @JoinColumn()
    User: UsersEntity;

    @OneToMany(() => FeedPostEntity, (feedPostEntity) => feedPostEntity.Doctor, { nullable: true })
    FeedPosts: FeedPostEntity[];

    @OneToMany(() => HistoricEntity, (historic) => historic.Doctor, { nullable: true })
    Historic: HistoricEntity[];

}