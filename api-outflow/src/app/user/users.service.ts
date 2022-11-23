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
    try {
      return await this.usersRepository.find(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneOrFail(id: string): Promise<any> {
    try {
      return this.usersRepository.findOne({
        where: { id },
        relations: {
          Client: true,
          Doctor: true,
          DetailsProfile: true

        },
      });

    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(email: string) {
    try {
      return await this.usersRepository.findOneBy({ email });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateUserDto) {
    try {
      const user = this.usersRepository.create(data);
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new NotFoundException(error.message);
    }

  }

  async update(id: string, data: UpdateUserDto) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      data.password = hashSync(user.password, 10);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    return await this.usersRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.usersRepository.findOneById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    return await this.usersRepository.softDelete({ id });
  }
}