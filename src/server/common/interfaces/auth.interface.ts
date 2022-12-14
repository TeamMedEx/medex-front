import { BaseResponse } from 'src/shared/base-response';
import { AuthLoginDTO, AuthRegisterDTO } from 'src/shared/dtos';

export interface IAuthService {
   medexLogin(payload: AuthLoginDTO): Promise<BaseResponse>;
   medexRegister(payload: AuthRegisterDTO): Promise<BaseResponse>;
}
