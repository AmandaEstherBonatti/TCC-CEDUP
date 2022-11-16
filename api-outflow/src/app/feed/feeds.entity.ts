import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DoctorsEntity } from "../doctor/doctors.entity";
import { UsersEntity } from "../user/users.entity";

@Entity({ name: 'feed_post_entity' })
export class FeedPostEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true, length: '3000' })
    description: string;


    @Column({ nullable: true })
    photoFeed: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => DoctorsEntity, (user) => user.FeedPosts, { cascade: ['insert', 'update', 'remove'], })
    Doctor: DoctorsEntity;
}
