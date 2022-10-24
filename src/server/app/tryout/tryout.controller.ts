import {
   Controller,
   Body,
   Get,
   Post,
   Header,
   Headers,
   HttpCode,
   Param,
   Request,
   Response,
} from '@nestjs/common';
// import { Request } from 'express';
import { TryoutService } from './tryout.service';

@Controller('')
export class TryoutController {
   constructor(private readonly tryoutService: TryoutService) {}

   @HttpCode(200)
   @Get('/api/v1/exam/all')
   @Header('Content-type', 'application/json')
   async listTryout(
      @Param() param: any,
      @Request() req: any,
      @Headers() header: any,
   ): Promise<any> {
      return await this.tryoutService.listTryout(param, req, header);
   }

   @HttpCode(200)
   @Get('/api/v1/exam/:oid/detail')
   @Header('Content-type', 'application/json')
   async detailTryout(
      @Param() param: any,
      @Request() req: any,
      @Headers() header: any,
   ): Promise<any> {
      return await this.tryoutService.detailTryout(param, req, header);
   }

   @HttpCode(200)
   @Post('/api/v1/exam/:oid/submit')
   @Header('Content-type', 'application/json')
   async submitExam(
      @Param() param: any,
      @Request() req: any,
      @Headers() header: any,
   ): Promise<any> {
      return this.tryoutService.submitExam(param, req, header);
   }
}
