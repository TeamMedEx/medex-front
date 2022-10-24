import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import NextAuth from '../../../shared/next-auth';

@Injectable()
export class NextAuthMiddleware implements NestMiddleware {
   private NEXTAUTH_BASE_URL: string;
   private logger = new Logger('NextAuth');

   constructor() {
      this.NEXTAUTH_BASE_URL = '/api/auth/';
   }
   use(request: any, response: any, next: any) {
      // validate url
      if (!request.url.startsWith(this.NEXTAUTH_BASE_URL)) {
         return next();
      }
      /**
       * use next dynamic routes for handling pages/api/[..next--auth]
       * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
       */
      request.query['nextauth'] = request.url
         .slice(this.NEXTAUTH_BASE_URL.length)
         .replace(/\?.*/, '')
         .split('/');

      // set logger
      response.on('finish', () => {
         const { method, path } = request;
         const { statusCode, statusMessage } = response;
         const message = `${method} ${path} ${statusCode} ${statusMessage}`;

         if (statusCode >= 500) {
            return this.logger.error(message);
         }

         if (statusCode >= 400) {
            return this.logger.warn(message);
         }

         return this.logger.log(message);
      });

      // NextAuth callback
      NextAuth(request, response);
   }
}
