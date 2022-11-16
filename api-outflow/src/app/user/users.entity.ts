import { ClientEntity } from '../client/clients.entity';
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToMany
} from 'typeorm';
import { DoctorsEntity } from '../doctor/doctors.entity';
import { Role } from './enum/role.enum';
import { FeedPostEntity } from '../feed/feeds.entity';
import { hashSync } from 'bcrypt';

import { DetailsProfileEntity } from '../details-profile/details-profile.entity';

@Entity({ name: 'users_entity' })
export class UsersEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string

    @Column()
    role: Role;

    @Column({ nullable: true })
    photo: string;

    @OneToOne(() => ClientEntity, (client) => client.User, {
        nullable: true
    })
    Client: ClientEntity

    @OneToOne(() => DoctorsEntity, (doctor) => doctor.User, {
        nullable: true
    })
    Doctor: DoctorsEntity

    @OneToOne(() => DetailsProfileEntity, (Details) => Details.User, {
        nullable: true,
        eager: true
    })
    DetailsProfile: DetailsProfileEntity



    @BeforeInsert()
    hasPassword() {
        this.password = hashSync(this.password, 10);
    }
}