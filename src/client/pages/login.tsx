import {
    type ChangeEvent,
    type FormEvent,
    type RefObject,
    createRef,
    useState,
} from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

// shared module
import { AuthLoginDTO } from '../../shared/dtos';
import { GoogleSVG } from '../components/svg/Google';
import SocialLoginPrompt, {
    SocialLoginPromptRef,
} from '../components/modals/SocialLoginPrompt';

const Login: NextPage = () => {
    const router = useRouter();
    const modalRef: RefObject<SocialLoginPromptRef> = createRef();

    const [dataLogin, setDataLogin] = useState<AuthLoginDTO>({
        email: '',
        password: '',
    });

    // Handler
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setDataLogin({ ...dataLogin, [e.target.id]: e.target.value });
    };

    const onSubmitHandler = async (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        // toggle modal
        // modalRef.current.open();

        const res = await signIn('credentials', {
            email: dataLogin.email,
            password: dataLogin.password,
            callbackUrl: `${window.location.origin}/dashboard`,
            redirect: false,
        });
        console.log(res);
        if (!res.ok) {
            setDataLogin({ email: '', password: '' });
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="flex w-3/4 flex-col overflow-hidden rounded-md bg-white shadow-lg md:flex-1 md:flex-row lg:max-w-screen-md">
                <div className="bg-blue-500 p-4 py-6 text-white md:flex md:w-80 md:flex-shrink-0 md:flex-col md:items-center md:justify-evenly">
                    <div className="my-3 text-center text-5xl font-bold tracking-wider">
                        <a
                            className="cursor-pointer"
                            onClick={() => router.push('/')}
                        >
                            MED-EX
                        </a>
                    </div>
                    <p className="mt-6 hidden text-center text-sm font-normal text-gray-300 md:mt-0 md:inline-block">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ullam, porro eligendi eum saepe ea, ratione dignissimos
                        sint est consequatur, dolore aliquam voluptas dolor sed
                        beatae minima at. Nesciunt, fugiat placeat.
                    </p>
                    <p className="mt-10 flex flex-col items-center justify-center text-center">
                        <span className="md:text text-sm">
                            Belum punya akun?
                        </span>
                        <a
                            href="#"
                            className="text-sm underline md:text-[14px]"
                        >
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
                                htmlFor="email"
                                className="text-sm font-semibold text-gray-500"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                autoFocus
                                value={dataLogin.email}
                                onChange={onChangeHandler}
                                placeholder="Email"
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
                                placeholder="Password"
                                className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            />
                        </div>
                        {/* <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="remember"
                                className="h-4 w-4 rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-0"
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm font-semibold text-gray-500"
                            >
                                Remember me
                            </label>
                        </div> */}
                        <div>
                            <button
                                type="submit"
                                className="w-full rounded-md bg-blue-500 px-4 py-2 text-lg font-semibold text-white shadow transition-colors duration-300 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200"
                            >
                                Masuk
                            </button>
                        </div>
                        <div className="flex flex-col space-y-1 md:space-y-5">
                            <span className="hidden md:flex md:items-center md:justify-center md:space-x-2">
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
                                <GoogleSVG />
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
            <SocialLoginPrompt ref={modalRef} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {},
    };
};

export default Login;
