import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthLoginDTO } from 'src/shared/dtos/auth-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const payload: AuthLoginDTO = req.body;
    const data = await this.authService.medexLogin(payload);
    return res.json(data);
  }
}
