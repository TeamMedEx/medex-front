import NextAuth from 'next-auth';
import { nextauthOpts } from './next-auth';

export default function (req: any, res: any) {
   return NextAuth(req, res, nextauthOpts);
}
