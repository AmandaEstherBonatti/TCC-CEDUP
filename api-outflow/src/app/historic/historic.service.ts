import { Injectable, NotFoundException } from "@nestjs/common";

import { InjectRepository } from '@nestjs/typeorm';
import {
    FindManyOptions,
    Repository,
} from 'typeorm';
import { CreateHistoricDto } from "./dto/create-historic.dto";
import { UpdateHistoricDto } from "./dto/update-historic.dto";
import { HistoricEntity } from "./historic.entity";

@Injectable()
export class HistoricService {
    constructor(
        @InjectRepository(HistoricEntity)
        private readonly historicRepository: Repository<HistoricEntity>,
    ) { }

    async findByDoctor(id: string) {
        return await this.historicRepository.createQueryBuilder('historic')
            .leftJoinAndSelect('historic.Client', 'Client')
            .where(`doctorId="${id}"`)
            .getMany();
    }

    async findAll() {
        const options: FindManyOptions = {
            // order: { createdAt: 'DESC' },
        };
        return await this.historicRepository.find(options);
    }

    async findOneOrFail(
        id: string
    ) {
        try {
            return await this.historicRepository.findOneBy({ id });
        } catch {
            throw new NotFoundException();
        }
    }

    async store(data: CreateHistoricDto) {
        const historic = this.historicRepository.create(data);
        return await this.historicRepository.save(historic);
    }

    async update(id: string, data: UpdateHistoricDto) {
        try {
            await this.historicRepository.findOneBy({ id });
        } catch {
            throw new NotFoundException();
        }
        return await this.historicRepository.save({ id: id, ...data });
    }

    async destroy(id: string) {
        try {
            await this.historicRepository.findOneBy({ id });
        } catch {
            throw new NotFoundException();
        }
        return await this.historicRepository.softDelete({ id });
    }
}