import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

// local dependencies
import { Medex } from '../../common/models';
import { IAuthService } from '../../common/interfaces';
import { BaseResponse } from 'src/shared/base-response';
import { AuthLoginDTO, AuthRegisterDTO } from 'src/shared/dtos';

@Injectable()
export class TryoutService extends Medex {
   constructor(
      private readonly configService: ConfigService,
      private readonly httpService: HttpService,
   ) {
      super();
   }
   async listTryout(param, req, header: any): Promise<BaseResponse> {
      try {
         const { page, limit, search } = req.query;
         const { data } = await this.httpService.axiosRef({
            method: 'GET',
            url: `${this.configService.get<string>(
               'MEDEX_BASEAPI_URI',
            )}/exam/all?page=${page}&limit=${limit}&search=${search}`,
            headers: { 'x-access-token': header.authorization },
         });
         return data;
      } catch (error) {
         return error.response?.data ? error.response.data : this.baseResponse;
      }
   }

   async detailTryout(param, req, header): Promise<BaseResponse> {
      try {
         const { data } = await this.httpService.axiosRef({
            method: 'GET',
            url: `${this.configService.get<string>('MEDEX_BASEAPI_URI')}/exam/${
               param.oid
            }/detail`,
            headers: { 'x-access-token': header.authorization },
         });
         return data;
      } catch (error) {
         return error.response?.data ? error.response.data : this.baseResponse;
      }
   }

   async submitExam(param, req, header): Promise<BaseResponse> {
      try {
         const { data } = await this.httpService.axiosRef({
            method: 'POST',
            url: `${this.configService.get<string>('MEDEX_BASEAPI_URI')}/exam/${
               param.oid
            }/submit`,
            headers: { 'x-access-token': header.authorization },
            data: req.body,
         });
         return data;
      } catch (error) {
         return error.response?.data ? error.response.data : this.baseResponse;
      }
   }

   // async endConsultation(param, req: any, header: any): Promise<any> {
   // 	let options = {
   // 		baseURL: process.env.NEXT_PUBLIC_CONSUL_API_BASE_URL + 'v1/',
   // 		method: 'post',
   // 		url: `teleconsultation/${param.orderNumber}/close`,
   // 		timeout: parseInt(process.env.TIMEOUT, 60000),
   // 		data: req.body,
   // 		headers: {
   // 			authorization: header.auth,
   // 		},
   // 	};
   // 	let res = await lastValueFrom(
   // 		this.httpService.request(options).pipe(
   // 			map((res) => {
   // 				return res.data;
   // 			}),
   // 		),
   // 	);
   // 	return res;
   // }
}
