
import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UsersEntity } from 'src/app/user/users.entity';
import { UsersService } from 'src/app/user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    let user: UsersEntity;
    try {
      user = await this.userService.findOne(email);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async login(user: UsersEntity) {
    const payload = { sud: user.id, login: user.email };
    return {
      id: user.id,
      token: this.jwtService.sign(payload),
    };
  }

  verifyToken(jwt: any) {
    const verify = this.jwtService.verify(jwt, {
      secret: process.env.JWT_SECRET_KEY,
    });
    return verify ? true : false;

  }

  decodeToken(jwt: any) {
    const verifyToken = this.jwtService.verify(jwt, {
      secret: process.env.JWT_SECRET_KEY,
    });
    return verifyToken ?? null;
  }
}
