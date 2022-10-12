import { Injectable, NotFoundException } from "@nestjs/common";
import { AddressEntity } from "./address.entity";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { InjectRepository } from '@nestjs/typeorm';
import {
    FindManyOptions,
    Repository,
} from 'typeorm';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
    ) { }

    async findAll() {
        const options: FindManyOptions = {
            order: { createdAt: 'DESC' },
        };
        return await this.addressRepository.find(options);
    }

    async findOneOrFail(
        id: string
    ) {
        try {
            return await this.addressRepository.findOneBy({ id });
        } catch {
            throw new NotFoundException();
        }
    }

    async store(data: CreateAddressDto) {
        const address = this.addressRepository.create(data);
        return await this.addressRepository.save(address);
    }

    async update(id: string, data: UpdateAddressDto) {
        try {
            await this.addressRepository.findOneBy({ id });
        } catch {
            throw new NotFoundException();
        }
        return await this.addressRepository.save({ id: id, ...data });
    }

    async destroy(id: string) {
        try {
            await this.addressRepository.findOneBy({ id });
        } catch {
            throw new NotFoundException();
        }
        return await this.addressRepository.softDelete({ id });
    }
}