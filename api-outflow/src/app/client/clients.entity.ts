import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { HistoricEntity } from '../historic/historic.entity';
import { UsersEntity } from '../user/users.entity';
import { Gender } from './enum/gender.enum';

@Entity({ name: 'clients_entity' })
export class ClientEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string

  @Column()
  birthday: string;

  @Column()
  gender: Gender;

  @Column()
  phoneNumber: string;

  @OneToMany(() => HistoricEntity, (historic) => historic.Client, { nullable: true })
  Historic: HistoricEntity[];

  @OneToOne(() => UsersEntity, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()

  User: UsersEntity;

}