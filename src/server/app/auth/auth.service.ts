import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AuthLoginDTO, AuthRegisterDTO } from 'src/shared/dtos';
import { AuthServiceImpl } from '../common/contracts';
import { BaseResponse } from 'src/shared/base-response';

@Injectable()
export class AuthService implements AuthServiceImpl {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async medexLogin(payload: AuthLoginDTO): Promise<BaseResponse> {
    try {
      const { data } = await this.httpService.axiosRef({
        method: 'POST',
        url: this.configService.get<string>('MEDEX_LOGIN_URI'),
        data: payload,
      });
      return data as BaseResponse;
    } catch (error) {
      return error;
    }
  }

  async medexRegister(payload: AuthRegisterDTO): Promise<BaseResponse> {
    try {
      const { data } = await this.httpService.axiosRef({
        method: 'POST',
        url: this.configService.get<string>('MEDEX_REGISTER_URI'),
        data: payload,
      });
      return data as BaseResponse;
    } catch (error) {
      return error;
    }
  }
}
