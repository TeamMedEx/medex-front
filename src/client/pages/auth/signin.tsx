import axios from 'axios';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

// shared module
import { AuthLoginDTO } from '../../../shared/dtos';
import { BaseResponse } from '../../../shared/base-response';

const Login: FC = () => {
   const router = useRouter();

   const [dataLogin, setDataLogin] = useState<AuthLoginDTO>({
      username: '',
      password: '',
   });

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setDataLogin({ ...dataLogin, [e.target.id]: e.target.value });
   };

   const onSubmitHandler = async (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault();

      // send request to API
      const { data } = await axios.post<BaseResponse>(
         'api/auth/login',
         dataLogin,
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
                        Masuk untuk melanjutkan ke Med-ex!
                     </div>
                     <div className="mt-2 flex justify-center">
                        Belum punya akun?{' '}
                        <div
                           className="cursor-pointer pl-2 font-extrabold text-blue-900"
                           onClick={() => router.push('/register')}
                        >
                           Daftar
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
                           value={dataLogin.username}
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
                           value={dataLogin.password}
                           onChange={onChangeHandler}
                        />
                        {/* <p className="text-red-500 text-xs italic">
									Please choose a password.
								</p> */}
                     </div>
                     <div className="flex items-center justify-between">
                        <button
                           className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
                           type="submit"
                        >
                           Masuk
                        </button>
                        <a
                           className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
                           href="#"
                        >
                           Forgot Password?
                        </a>
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
