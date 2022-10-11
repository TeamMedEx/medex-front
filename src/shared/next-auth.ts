import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';

/**
 * NextAuth Setup
 */
export default function (req: any, res: any) {
    return NextAuth(req, res, {
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            }),
            CredentialsProvider({
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
                        const loginUrl = `${process.env.MEDEX_BASEAPI_URI}${process.env.MEDEX_LOGIN_URI}`;
                        const { data } = await axios.post(
                            loginUrl,
                            {
                                username: credentials?.username,
                                password: credentials?.password,
                            },
                            {
                                headers: {
                                    accept: '*/*',
                                    'Content-Type': 'application/json',
                                },
                            },
                        );
                        if (data.meta.status !== 200) return null;
                        const decoded = jwt.decode(data.data.token);
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
            signIn: async ({ account, profile }) => {
                if (account.provider == 'google') {
                    console.log(profile, 'callbacks signIn');
                    return true;
                }
                return true;
            },
            jwt: async ({ token, user, account }) => {
                if (account?.provider == 'credentials') {
                    token = {
                        user: user?.user,
                        accessToken: user?.token,
                    };
                } else if (account?.provider == 'google') {
                    token = {
                        user: user,
                        accessToken: account?.access_token,
                    };
                }
                return token;
            },
            session: async ({ session, token }) => {
                console.log(token);
                session.accessToken = token?.accessToken;
                session.user = token.user ? token?.user : session?.user;
                return session;
            },
        },
        pages: {
            signIn: '/login',
        },
    });
}
