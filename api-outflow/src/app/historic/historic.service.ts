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
        try {
            const historics = await this.historicRepository.createQueryBuilder('historic')
                .leftJoinAndSelect('historic.Client', 'Client')
                .where(`doctorId="${id}"`)
                .getMany();

            let data = [...new Map(historics.map((m) => [m.Client.id, m])).values()];

            return data;

        } catch (error) {
            throw new NotFoundException(error.message);
        }

    }

    async findAll() {
        const options: FindManyOptions = {
            // order: { createdAt: 'DESC' },
        };
        try {
            return await this.historicRepository.find(options);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async findOneOrFail(
        id: string
    ) {
        try {
            return await this.historicRepository.findOneBy({ id });
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async store(data: CreateHistoricDto) {
        try {
            const historic = this.historicRepository.create(data);
            return await this.historicRepository.save(historic);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async update(id: string, data: UpdateHistoricDto) {
        try {
            await this.historicRepository.findOneBy({ id });
        } catch (error) {
            throw new NotFoundException(error.message);
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