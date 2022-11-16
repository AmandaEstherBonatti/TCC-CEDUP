import { AuthService } from './auth.service';
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any) {
    return await this.authService.login(req.user)
  }

  @Get('decode')
  async decodeToken(@Req() req: any) {
    try {
      return await this.authService.decodeToken(req.headers.authorization);
    } catch (error) {
      return false;
    }
  }
}
