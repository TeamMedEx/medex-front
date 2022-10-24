import NextAuth from 'next-auth';
import { nextauthOpts } from './options';

export default function (req, res) {
   return NextAuth(req, res, nextauthOpts);
}
