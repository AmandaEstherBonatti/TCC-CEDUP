import { UsersEntity } from 'src/app/user/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConversationEntity } from './conversation.entity';

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column()
  message: string;

  @ManyToOne(() => UsersEntity, (userEntity) => userEntity.Messages)
  User: UsersEntity;

  @ManyToOne(
    () => ConversationEntity,
    (conversation) => conversation.Messages,
  )
  Conversation: ConversationEntity;

  @CreateDateColumn()
  createdAt: Date;
}
