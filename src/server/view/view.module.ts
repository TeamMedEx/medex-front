import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { NextExceptionFilter } from './next-exception.filter';
import { ViewController } from './view.controller';

import { ViewService } from './view.service';

@Module({
   providers: [
      {
         provide: APP_FILTER,
         useClass: NextExceptionFilter,
      },
      ViewService,
   ],
   controllers: [ViewController],
})
export class ViewModule {}
