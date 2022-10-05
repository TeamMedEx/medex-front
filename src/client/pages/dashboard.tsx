import { FC } from 'react';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import * as jwt from 'jsonwebtoken';

type IDashboardProps = {
    is_logged_in: boolean;
};

const Dashboard: FC<IDashboardProps> = () => {
    const router = useRouter();
    getSession().then((res) => console.log(res));
    const sessionCheck = useSession();
    console.log('ssessionCheck: ', sessionCheck);

    return (
        <div className="h-screen">
            <Head>
                <title>Medical Exam Platform</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="h-full w-full">
                <div className="flex w-full">
                    <div className="w-3/12">
                        <div className="mt-5 flex justify-center">
                            <img
                                src="/medex-logo-1.svg"
                                width={150}
                                height={100}
                                className="cursor-pointer object-contain"
                                onClick={() => router.push('/')}
                            />
                        </div>
                        <div>
                            <ul className="mt-10 ml-5">
                                <li className="px-5 py-2 text-lg font-semibold">
                                    BERANDA
                                </li>
                                <li className="px-5 py-2 text-lg font-semibold">
                                    HISTORY
                                </li>
                                <li className="px-5 py-2 text-lg font-semibold">
                                    TRANSAKSI
                                </li>
                                <li className="px-5 py-2 text-lg font-semibold">
                                    PROFIL
                                </li>
                                <li className="px-5 py-2 text-lg font-semibold">
                                    LOGOUT
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-9/12">
                        <div className="flex h-16 items-center justify-end">
                            <div className="flex">
                                <div className="avatar">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-base-300">
                                        <img
                                            src="/medex-logo-1.svg"
                                            className="cursor-pointer !object-contain"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center px-2 font-semibold">
                                    John Doe
                                </div>
                            </div>
                        </div>
                        <div className="bg-green-teal h-full w-full grid-cols-3 overflow-y-auto">
                            <div className="grid grid-cols-3 gap-4 p-4">
                                <div className="card image-full card-compact h-52 w-full bg-base-100 shadow-xl">
                                    <figure>
                                        <img
                                            src="/image/bg-exam-medex.png"
                                            alt="Shoes"
                                        />
                                    </figure>
                                    <div className="card-body justify-between">
                                        <h2 className="card-title">
                                            Paket Tryout 11 Juli 2022
                                        </h2>
                                        <div className="flex">
                                            <p>
                                                Jumlah soal : 200 <br />
                                                Durasi : 200 Menit <br />
                                            </p>
                                            <p>
                                                Member : Gold <br />
                                                Limit : 2
                                            </p>
                                        </div>
                                        <div className="card-actions items-end justify-center">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    router.push('/tryout')
                                                }
                                            >
                                                Mulai
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-compact card image-full h-52 w-full bg-base-100 shadow-xl">
                                    <figure>
                                        <img
                                            src="/image/bg-exam-medex-1.jpg"
                                            alt="Shoes"
                                        />
                                    </figure>
                                    <div className="card-body justify-between">
                                        <h2 className="card-title">
                                            Paket Tryout 11 Juli 2022
                                        </h2>
                                        <div className="flex">
                                            <p>
                                                Jumlah soal : 200 <br />
                                                Durasi : 200 Menit <br />
                                            </p>
                                            <p>
                                                Member : Gold <br />
                                                Limit : 2
                                            </p>
                                        </div>
                                        <div className="card-actions items-end justify-center">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    router.push('/tryout')
                                                }
                                            >
                                                Mulai
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-compact card image-full h-52 w-full bg-base-100 shadow-xl">
                                    <figure>
                                        <img
                                            src="/image/bg-exam-medex-2.jpg"
                                            alt="Shoes"
                                        />
                                    </figure>
                                    <div className="card-body justify-between">
                                        <h2 className="card-title">
                                            Paket Tryout 11 Juli 2022
                                        </h2>
                                        <div className="flex">
                                            <p>
                                                Jumlah soal : 200 <br />
                                                Durasi : 200 Menit <br />
                                            </p>
                                            <p>
                                                Member : Gold <br />
                                                Limit : 2
                                            </p>
                                        </div>
                                        <div className="card-actions items-end justify-center">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    router.push('/tryout')
                                                }
                                            >
                                                Mulai
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-compact card image-full h-52 w-full bg-base-100 shadow-xl">
                                    <figure>
                                        <img
                                            src="/image/bg-exam-medex-3.jpg"
                                            alt="Shoes"
                                        />
                                    </figure>
                                    <div className="card-body justify-between">
                                        <h2 className="card-title">
                                            Paket Tryout 11 Juli 2022
                                        </h2>
                                        <div className="flex">
                                            <p>
                                                Jumlah soal : 200 <br />
                                                Durasi : 200 Menit <br />
                                            </p>
                                            <p>
                                                Member : Gold <br />
                                                Limit : 2
                                            </p>
                                        </div>
                                        <div className="card-actions items-end justify-center">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    router.push('/tryout')
                                                }
                                            >
                                                Mulai
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </main>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return { props: ctx.query };
};

export default Dashboard;
