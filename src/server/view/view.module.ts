import { Module } from '@nestjs/common';
import { AppModule } from '../app/app.module';

import { ViewController } from './view.controller';
import { ViewService } from './view.service';

@Module({
  imports: [AppModule],
  providers: [ViewService],
  controllers: [ViewController],
})
export class ViewModule {}
