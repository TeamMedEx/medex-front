import axios from 'axios';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

// shared module
import { AuthRegisterDTO } from '../../shared/dtos';
import { BaseResponse } from '../../shared/base-response';

type ILoginProps = {
  payload: any;
};

const Login: FC<ILoginProps> = () => {
  const router = useRouter();

  const [dataRegister, setDataRegister] = useState<AuthRegisterDTO>({
    email: '',
    username: '',
    password: '',
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDataRegister({ ...dataRegister, [e.target.id]: e.target.value });
  };

  const onSubmitHandler = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    // send request to API
    const { data } = await axios.post<BaseResponse>(
      'api/auth/register',
      dataRegister,
    );

    if (data.meta.status == 200) {
      router.replace(
        {
          pathname: '/',
          query: { is_logged_in: true },
        },
        '/',
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
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
          <div className="mt-4" onSubmit={onSubmitHandler}>
            <form className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
              <div className="text-2xl font-semibold text-blue-900">
                Yuk, daftar sekarang buat dapetin diskon spesial di website
                Med-ex!
              </div>
              <div className="mt-2 flex justify-center">
                Sudah punya akun?{' '}
                <div
                  className="cursor-pointer pl-2 font-extrabold text-blue-900"
                  onClick={() => router.push('/login')}
                >
                  Masuk
                </div>
              </div>
              <div className="mt-8 mb-4">
                <label
                  className="mb-2 block text-left text-sm font-bold text-gray-700"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={dataRegister.username}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block text-left text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  id="email"
                  type="text"
                  placeholder="Email"
                  value={dataRegister.email}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block text-left text-sm font-bold text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  // className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  className="focus:shadow-outline mb-3 w-full appearance-none rounded py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  id="password"
                  type="password"
                  placeholder="******************"
                  value={dataRegister.password}
                  onChange={onChangeHandler}
                />
                {/* <p className="text-red-500 text-xs italic">
                  Please choose a password.
                </p> */}
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="focus:shadow-outline rounded bg-blue-500 py-2 px-10 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  type="submit"
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
