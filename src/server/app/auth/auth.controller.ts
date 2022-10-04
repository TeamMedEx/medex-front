import { Controller, Inject, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthLoginDTO, AuthRegisterDTO } from 'src/shared/dtos';
import { IAuthService } from '../../common/interfaces';
import { TYPES } from '../../common/type';

@Controller('_auth')
export class AuthController {
    constructor(
        @Inject(TYPES.service.AuthService)
        private authService: IAuthService,
    ) {}

    @Post('login')
    async login(@Req() req: Request) {
        const dto: AuthLoginDTO = req.body;
        return await this.authService.medexLogin(dto);
    }

    @Post('register')
    async register(@Req() req: Request) {
        const dto: AuthRegisterDTO = req.body;
        return await this.authService.medexRegister(dto);
    }
}
