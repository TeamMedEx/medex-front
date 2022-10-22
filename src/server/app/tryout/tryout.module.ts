import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TYPES } from '../../common/type';
import { AxiosModule } from '../../common/modules';
import { TryoutController } from './tryout.controller';
import { TryoutService } from './tryout.service';

@Module({
   imports: [
      AxiosModule.registerAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory: async (configService: ConfigService) => ({
            baseURL: configService.get<string>('MEDEX_BASEAPI_URI'),
         }),
      }),
   ],
   controllers: [TryoutController],
   providers: [TryoutService],
   exports: [TryoutService],
})
export class TryoutModule {}
