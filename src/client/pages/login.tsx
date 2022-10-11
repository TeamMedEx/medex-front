import { ChangeEvent, FormEvent, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

// shared module
import { AuthLoginDTO } from '../../shared/dtos';

const Login: NextPage = () => {
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

        const res = await signIn('credentials', {
            username: dataLogin.username,
            password: dataLogin.password,
            callbackUrl: `${window.location.origin}/dashboard`,
            redirect: false,
        });
        if (!res.ok) {
            setDataLogin({ username: '', password: '' });
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className="flex min-h-screen items-center p-4 lg:justify-center">
            <div className="max flex flex-col overflow-hidden rounded-md bg-white shadow-lg md:flex-1 md:flex-row lg:max-w-screen-md">
                <div className="bg-blue-500 p-4 py-6 text-white md:flex md:w-80 md:flex-shrink-0 md:flex-col md:items-center md:justify-evenly">
                    <div className="my-3 text-center text-5xl font-bold tracking-wider">
                        <a
                            className="cursor-pointer"
                            onClick={() => router.push('/')}
                        >
                            MED-EX
                        </a>
                    </div>
                    <p className="mt-6 text-center text-sm font-normal text-gray-300 md:mt-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ullam, porro eligendi eum saepe ea, ratione dignissimos
                        sint est consequatur, dolore aliquam voluptas dolor sed
                        beatae minima at. Nesciunt, fugiat placeat.
                    </p>
                    <p className="mt-10 flex flex-col items-center justify-center text-center">
                        <span>Belum punya akun?</span>
                        <a href="#" className="underline">
                            Daftar!
                        </a>
                    </p>
                </div>
                <div
                    className="bg-white p-5 md:flex-1"
                    onSubmit={onSubmitHandler}
                >
                    <h3 className="my-4 text-center text-sm font-semibold text-gray-700">
                        Masuk untuk melanjutkan ke Med-ex!
                    </h3>
                    <form className="flex flex-col space-y-5">
                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="username"
                                className="text-sm font-semibold text-gray-500"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                autoFocus
                                value={dataLogin.username}
                                onChange={onChangeHandler}
                                className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-semibold text-gray-500"
                                >
                                    Password
                                </label>
                                <a
                                    href="#"
                                    className="text-sm text-blue-600 hover:underline focus:text-blue-800"
                                >
                                    Lupa Password?
                                </a>
                            </div>
                            <input
                                type="password"
                                id="password"
                                value={dataLogin.password}
                                onChange={onChangeHandler}
                                className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            {/* <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-0"
              />
              <label
                htmlFor="remember"
                className="text-sm font-semibold text-gray-500"
              >
                Remember me
              </label> */}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full rounded-md bg-blue-500 px-4 py-2 text-lg font-semibold text-white shadow transition-colors duration-300 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200"
                            >
                                Masuk
                            </button>
                        </div>
                        <div className="flex flex-col space-y-5">
                            <span className="flex items-center justify-center space-x-2">
                                <span className="h-px w-14 bg-gray-400"></span>
                                <span className="text-sm font-normal text-gray-500">
                                    atau masuk menggunakan
                                </span>
                                <span className="h-px w-14 bg-gray-400"></span>
                            </span>
                            <div
                                className="flex cursor-pointer flex-col space-y-4"
                                onClick={() =>
                                    signIn('google', {
                                        callbackUrl: '/dashboard',
                                    })
                                }
                            >
                                <a className="group flex items-center justify-center space-x-2 rounded-md border border-[#EA4335] px-4 py-2 transition-colors duration-300 hover:border-[#EA4335] hover:bg-[#EA4335] focus:outline-none">
                                    <span>
                                        <svg
                                            width="24"
                                            height="24"
                                            className="fill-[#EA4335] group-hover:fill-white"
                                        >
                                            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                                <path
                                                    // fill="#EA4335"
                                                    d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                                                />
                                                <path
                                                    // fill="#EA4335"
                                                    d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                                                />
                                                <path
                                                    // fill="#EA4335"
                                                    d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                                                />
                                                <path
                                                    // fill="#EA4335"
                                                    d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                                                />
                                            </g>
                                        </svg>
                                    </span>
                                    <span className="text-sm font-medium text-gray-500 group-hover:text-white">
                                        Google
                                    </span>
                                </a>
                                {/* <a
                  href="#"
                  className="group flex items-center justify-center space-x-2 rounded-md border border-blue-500 px-4 py-2 transition-colors duration-300 hover:bg-blue-500 focus:outline-none"
                >
                  <span>
                    <svg
                      className="text-blue-500 group-hover:text-white"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-gray-500 group-hover:text-white">
                    Twitter
                  </span>
                </a> */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {},
    };
};

export default Login;
