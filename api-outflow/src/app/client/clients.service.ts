import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { ClientEntity } from "./clients.entity";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";


@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) { }

  async findAll() {
    const options: FindManyOptions = {
      // order: { createdAt: 'DESC' },
    };
    try {
      return await this.clientRepository.find(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneOrFail(id: string) {
    try {
      return await this.clientRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateClientDto) {
    try {
      const client = this.clientRepository.create(data);
      return await this.clientRepository.save(client);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, data: UpdateClientDto) {
    try {
      await this.clientRepository.findOneById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    return await this.clientRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.clientRepository.findOneById(id);
    } catch {
      throw new NotFoundException();
    }
    return await this.clientRepository.softDelete({ id });
  }
}


