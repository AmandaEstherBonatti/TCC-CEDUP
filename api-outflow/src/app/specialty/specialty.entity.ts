import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DetailsProfileEntity } from "../details-profile/details-profile.entity";

@Entity({ name: 'specialty_entity' })
export class SpecialtyEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToOne(() => DetailsProfileEntity, (details) => details.Specialtys)
    DetailsProfile: DetailsProfileEntity;

}