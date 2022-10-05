import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NextAuthMiddleware } from '../common/middleware';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
    controllers: [AuthController],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(NextAuthMiddleware)
            .forRoutes({ path: 'api/auth/*', method: RequestMethod.ALL });
    }
}
