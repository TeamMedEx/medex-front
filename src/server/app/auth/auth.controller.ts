import { Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthLoginDTO, AuthRegisterDTO } from 'src/shared/dtos';
import { AuthServiceImpl } from '../common/contracts';
import { TYPES } from '../common/type';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(TYPES.service.AuthService)
    private authService: AuthServiceImpl,
  ) {}

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const payload: AuthLoginDTO = req.body;
    const data = await this.authService.medexLogin(payload);
    return res.json(data);
  }

  @Post('register')
  async register(@Req() req: Request, @Res() res: Response) {
    const payload: AuthRegisterDTO = req.body;
    const data = await this.authService.medexRegister(payload);
    return res.json(data);
  }
}
