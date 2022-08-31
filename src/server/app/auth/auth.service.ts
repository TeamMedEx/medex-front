import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

// local dependencies
import { MedexResponse } from '../common/base-response';
import { AuthServiceImpl } from '../common/contracts';
import { BaseResponse } from 'src/shared/base-response';
import { AuthLoginDTO, AuthRegisterDTO } from 'src/shared/dtos';

@Injectable()
export class AuthService extends MedexResponse implements AuthServiceImpl {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    super();
  }
  async medexLogin(payload: AuthLoginDTO): Promise<BaseResponse> {
    try {
      const { data } = await this.httpService.axiosRef({
        method: 'POST',
        url: this.configService.get<string>('MEDEX_LOGIN_URI'),
        data: payload,
      });
      return data;
    } catch (error) {
      return error.response?.data ? error.response.data : this.baseResponse;
    }
  }

  async medexRegister(payload: AuthRegisterDTO): Promise<BaseResponse> {
    try {
      const { data } = await this.httpService.axiosRef({
        method: 'POST',
        url: this.configService.get<string>('MEDEX_REGISTER_URI'),
        data: payload,
      });
      return data;
    } catch (error) {
      return error.response?.data ? error.response.data : this.baseResponse;
    }
  }
}
