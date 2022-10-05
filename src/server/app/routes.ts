import { Routes } from '@nestjs/core';
import { AppModule } from './app.module';

export const routes: Routes = [
    {
        path: 'api',
        module: AppModule,
    },
];
