import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { ClientEntity } from '../client/clients.entity';
import { DoctorsEntity } from '../doctor/doctors.entity';

@Entity({ name: 'address_entity' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cep: string;

  @Column()
  number: string;

  @Column()
  street: string;

  @Column()
  district: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  complement: string;

  @OneToOne(() => ClientEntity, (client) => client.Address)
  Client: ClientEntity;

  @OneToOne(() => DoctorsEntity, (doctor) => doctor.Address)
  Doctor: DoctorsEntity;

} 