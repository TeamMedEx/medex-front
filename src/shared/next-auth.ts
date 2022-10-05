import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';

export default function (req: any, res: any) {
  return NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
          },
        },
      }),
      CredentialsProvider({
        credentials: {
          email: {
            type: 'email',
          },
          password: {
            type: 'password',
          },
        },
        authorize: async (credentials) => {
          try {
            const loginUrl = `${process.env.MEDEX_BASEAPI_URI}${process.env.MEDEX_LOGIN_URI}`;
            const { data } = await axios.post(loginUrl, {
              email: credentials.email,
              password: credentials.password,
            });
            if (data.meta.status !== 200) return null;
            const decoded = jwt.decode(data.data.token);
            const user = {
              sub: decoded['_id'],
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
      signIn: async ({ account, profile }) => {
        if (account.provider == 'google') {
          /**
           * @TODO : persist data user to database
           * if success replace token and refresh_token from google
           */
          if (!profile.email_verified) return false;
          const data = {
            email: profile.email,
            name: profile.name,
            refreshToken: account.refresh_token,
            expiresAt: account.expires_at,
            source: 'google',
          };
          // const registerUrl = `${process.env.MEDEX_BASEAPI_URI}${process.env.MEDEX_REGISTER_URI}`;
          try {
            // await axios.post(registerUrl, data);
            return true;
          } catch (_) {
            return false;
          }
        } else {
          return true;
        }
      },
      jwt: async ({ token, user, account }) => {
        if (user && account?.provider == 'credentials') {
          const localdate = new Date(user.expiresAt as Date).toLocaleString();
          const timestamp = Number(Date.parse(localdate)) / 1000;
          token = {
            user: user.user,
            accessToken: user.token,
            refreshToken: user.refreshToken,
            tokenExpires: timestamp,
          };
        } else if (user && account?.provider == 'google') {
          token = {
            user: user,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            tokenExpires: account.expires_at,
          };
        }
        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user ? token.user : session.user;
        session.accessToken = token.accessToken;
        session.expires = token.tokenExpires as string;
        return session;
      },
    },
    pages: {
      signIn: '/login',
    },
  });
}
