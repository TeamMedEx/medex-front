import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize(credentials, req) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                if (email !== 'admin@gmail.com' && password !== '12345') {
                    return null;
                }

                return { id: '12345', name: 'Budi', email: 'admin@gmail.com' };
            },
        }),
    ],
    pages: {
        signIn: 'auth/signin',
        // error: 'auth/error',
        // signout: 'auth/signout',
    },
};

export default NextAuth(authOptions);
