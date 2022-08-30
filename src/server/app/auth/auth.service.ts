import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AuthLoginDTO } from 'src/shared/dtos/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async medexLogin(payload: AuthLoginDTO) {
    try {
      const { data } = await this.httpService.axiosRef({
        method: 'POST',
        url: this.configService.get<string>('MEDEX_LOGIN'),
        data: payload,
      });
      return data;
    } catch (error) {
      return error;
    }
  }
}
