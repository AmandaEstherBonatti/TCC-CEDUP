import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ActiveConversationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  socketId: string;

  @Column()
  userId: number;

  @Column()
  conversationId: number;
}
