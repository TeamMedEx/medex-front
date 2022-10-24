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
import { TryoutController } from './tryout/tryout.controller';
import { TryoutModule } from './tryout/tryout.module';

@Module({
   imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      AuthModule,
      TryoutModule,
   ],
   controllers: [AuthController, TryoutController],
   providers: [],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer
         .apply(NextAuthMiddleware)
         .forRoutes({ path: 'api/auth/*', method: RequestMethod.ALL });
   }
}
