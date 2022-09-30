import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

@Injectable()
export class NextAuthMiddleware implements NestMiddleware {
  protected BASE_URL: string;
  constructor(private readonly jwtService: JwtService) {
    this.BASE_URL = '/api/auth/';
  }
  use(req: any, res: any, next: any) {
    if (!req.url.startsWith(this.BASE_URL)) {
      return next();
    }
    /**
     * use next dynamic routes for handling pages/api/[..next--auth]
     * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
     */
    req.query['nextauth'] = req.url
      .slice(this.BASE_URL.length)
      .replace(/\?.*/, '')
      .split('/');
    NextAuth(req, res, {
      providers: [
        CredentialsProvider({
          name: 'Medex Credentials',
          credentials: {
            username: {
              type: 'text',
            },
            password: {
              type: 'password',
            },
          },
          authorize: async (credentials) => {
            try {
              const { data } = await axios.post(
                'http://localhost:3000/api/_auth/login',
                {
                  username: credentials.username,
                  password: credentials.password,
                },
                {
                  headers: {
                    accept: '*/*',
                    'Content-Type': 'application/json',
                  },
                },
              );
              if (data.meta.status !== 200) return null;
              const decoded = this.jwtService.decode(data.data.token);
              const user = {
                sub: decoded['_id'],
                username: decoded['username'],
                email: decoded['email'],
              };
              return { user, ...data.data };
            } catch (error) {
              console.log(error);
            }
          },
        }),
      ],
      callbacks: {
        jwt: async ({ token, user }) => {
          if (user) {
            token = {
              user: user.user,
              accessToken: user.token,
            };
          }
          return token;
        },
        session: async ({ session, token }) => {
          session.accessToken = token.accessToken;
          session.user = token.user ? token.user : session.user;
          return session;
        },
      },
      pages: {
        signIn: '/login',
      },
    });
  }
}
