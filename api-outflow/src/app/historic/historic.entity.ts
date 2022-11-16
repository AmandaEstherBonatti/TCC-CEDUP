import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ClientEntity } from '../client/clients.entity';
import { DoctorsEntity } from '../doctor/doctors.entity';

@Entity({ name: 'historic_entity' })
export class HistoricEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ClientEntity, (client) => client.Historic, { nullable: true, eager: true })
  Client: ClientEntity;

  @ManyToOne(() => DoctorsEntity, (doctor) => doctor.Historic, { nullable: true, eager: true })
  Doctor: DoctorsEntity;
} 