import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { AppModule } from 'src/server/app/app.module';
import { ViewModule } from 'src/server/view/view.module';
import { routes } from './app/routes';

@Module({
  imports: [RouterModule.register(routes), AppModule, ViewModule],
})
export class ServerModule {}
