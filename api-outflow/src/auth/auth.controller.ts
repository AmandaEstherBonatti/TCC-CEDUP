import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './public.decorator';
import { LocalStrategy } from './strategies/local.strategy';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() req: any) {
    return await this.authService.login(req.email, req.password)
  }

  @UseGuards(AuthGuard('JwtAuthGuard'))
  @Get('decode')
  async decodeToken(@Req() req: any) {
    try {
      return await this.authService.decodeToken(req.headers.authorization);
    } catch (error) {
      return false;
    }
  }
}
