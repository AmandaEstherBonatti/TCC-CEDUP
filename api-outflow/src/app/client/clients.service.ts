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
      order: { createdAt: 'DESC' },
    };
    return await this.clientRepository.find(options);
  }

  // async findByUser(id: string){
  //   return await this.clientRepository.find({
  //     select: ['id', 'name', 'lastName', 'birthday', 'gender', 'phoneNumber'],
  //     where: { User: id },
  //   })
  // }

  async findOneOrFail(id: string) {
    try {
      return await this.clientRepository.findOneBy({ id });
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateClientDto) {
    const client = this.clientRepository.create(data);
    return await this.clientRepository.save(client);
  }

  async update(id: string, data: UpdateClientDto) {
    try {
      await this.clientRepository.findOneById(id);
    } catch {
      throw new NotFoundException();
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


