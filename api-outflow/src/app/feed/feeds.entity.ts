import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "../user/users.entity";

@Entity({ name: 'feed_post_entity' })
export class FeedPostEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: '' })
    body: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UsersEntity, (user) => user.feedPosts, { cascade: ['insert', 'update', 'remove'], })
    User: UsersEntity;
}
