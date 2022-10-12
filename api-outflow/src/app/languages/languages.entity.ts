import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DetailsProfileEntity } from "../details-profile/details-profile.entity";

@Entity({ name: 'languages_entity' })
export class LangugesEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToOne(() => DetailsProfileEntity, (details) => details.Languages)
    DetailsProfile: DetailsProfileEntity;

}