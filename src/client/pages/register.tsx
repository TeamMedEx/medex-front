/* eslint-disable @next/next/no-img-element */

import { FC } from 'react';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

type ILoginProps = {
  payload: any;
};

const Login: FC<ILoginProps> = (props) => {
  const router = useRouter();

  const { payload } = props;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Nest Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="w-2/5">
          <div className="flex justify-center">
            <img
              src="/medex-logo-1.svg"
              width={200}
              height={100}
              className="cursor-pointer object-contain"
              onClick={() => router.push('/')}
            />
          </div>
          <div className="mt-4">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="text-2xl text-blue-900 font-semibold">
                Yuk, daftar sekarang buat dapetin diskon spesial di website
                Med-ex!
              </div>
              <div className="mt-2 flex justify-center">
                Sudah punya akun?{' '}
                <div
                  className="pl-2 text-blue-900 font-extrabold cursor-pointer"
                  onClick={() => router.push('/login')}
                >
                  Masuk
                </div>
              </div>
              <div className="mt-8 mb-4">
                <label
                  className="text-left block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="mb-4">
                <label
                  className="text-left block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="mb-6">
                <label
                  className="text-left block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  // className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                />
                {/* <p className="text-red-500 text-xs italic">
                  Please choose a password.
                </p> */}
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Daftar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: ctx.query };
};

export default Login;
