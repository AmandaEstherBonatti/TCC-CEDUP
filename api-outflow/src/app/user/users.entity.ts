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

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'datetime' })
    deletedAt: Date;

    @BeforeInsert()
    hasPassword() {
        this.password = hashSync(this.password.toString(), 10);
    }

    constructor(user?: Partial<UsersEntity>) {
        this.id = user?.id;
        this.email = user?.email;
        this.password = user?.password;
        this.role = user?.role;
        this.photo = user?.photo;
        this.Client = user?.Client;
        this.Doctor = user?.Doctor;
        this.DetailsProfile = user?.DetailsProfile;
    }
}