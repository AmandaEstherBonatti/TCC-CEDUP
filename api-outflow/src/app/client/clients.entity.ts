import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne
} from 'typeorm';
import { AddressEntity } from '../address/address.entity';
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
  birthday: Date;

  @Column()
  gender: Gender;

  @Column()
  phoneNumber: string;

  @OneToOne(() => AddressEntity, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Address: AddressEntity;

  @OneToOne(() => UsersEntity, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()

  User: UsersEntity;

}