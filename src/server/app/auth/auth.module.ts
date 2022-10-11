import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TYPES } from '../../common/type';
import { AxiosModule } from '../../common/modules';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
  controllers: [AuthController],
  providers: [
    {
      provide: TYPES.service.AuthService,
      useClass: AuthService,
    },
  ],
  exports: [TYPES.service.AuthService],
})
export class AuthModule {}
