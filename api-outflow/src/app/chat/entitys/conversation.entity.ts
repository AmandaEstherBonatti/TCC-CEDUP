import { UsersEntity } from 'src/app/user/users.entity';
import {
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MessageEntity } from './message.entity';

@Entity()
export class ConversationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => UsersEntity)
  @JoinTable()
  Users: UsersEntity[];

  @OneToMany(() => MessageEntity, (message) => message.Conversation)
  Messages: MessageEntity[];

  @UpdateDateColumn()
  lastUpdated: Date;
}
