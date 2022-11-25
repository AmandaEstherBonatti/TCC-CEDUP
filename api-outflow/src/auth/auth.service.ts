
import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { UsersEntity } from 'src/app/user/users.entity';
import { UsersService } from 'src/app/user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {

    var user: any;

    try {
      user = await this.userService.findOne(email);

    } catch (error) {
      return console.log(error.message);
    }


    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) return null;



    return user;
  }



  async login(email: string, password: string) {
    let obj = await this.validateUser(email, password);
    const payload = { sud: obj.id, login: obj.email };
    let token = this.jwtService.sign(payload)

    let data = {
      id: obj.id,
      role: obj.role,
      token: token
    }
    return data
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
