import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersEntity } from "./users.entity";
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { UpdateUserDto } from "./dto/update-user.dto";
import { hashSync } from 'bcrypt';
import { from, Observable } from "rxjs";


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) { }

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.usersRepository.find(options);
  }

  findOneOrFail(id: string) {
    try {
      return from(this.usersRepository.findOneBy({ id }));
    } catch {
      throw new NotFoundException();
    }
  }

  async findOne(email: string) {
    try {
      return await this.usersRepository.findOneBy({ email });
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateUserDto) {
    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      data.password = hashSync(user.password, 10);
    } catch {
      throw new NotFoundException();
    }
    return await this.usersRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.usersRepository.findOneById(id);
    } catch {
      throw new NotFoundException();
    }
    return await this.usersRepository.softDelete({ id });
  }
}