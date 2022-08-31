import { FC } from 'react';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

type IDashboardProps = {
  is_logged_in: boolean;
};

const Dashboard: FC<IDashboardProps> = () => {
  const router = useRouter();
  return (
    <div className="h-screen">
      <Head>
        <title>Medical Exam Platform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full w-full">
        <div className="flex h-5/6 w-full">
          <div className="w-3/12">
            <div className="mt-5 flex justify-center">
              <img
                src="/medex-logo-1.svg"
                width={200}
                height={100}
                className="cursor-pointer object-contain"
                onClick={() => router.push('/')}
              />
            </div>
            <div>
              <ul className='mt-10 ml-5'>
                <li className='text-lg font-semibold px-5 py-2'>BERANDA</li>
                <li className='text-lg font-semibold px-5 py-2'>HISTORY</li>
                <li className='text-lg font-semibold px-5 py-2'>TRANSAKSI</li>
                <li className='text-lg font-semibold px-5 py-2'>PROFIL</li>
                <li className='text-lg font-semibold px-5 py-2'>LOGOUT</li>
              </ul>
            </div>
          </div>
          <div className="w-9/12">
            <div className="flex h-16 items-center justify-end">
              <div className='flex'>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300 p-1">
                  <img
                    src="/medex-logo-1.svg"
                    className="cursor-pointer object-contain"
                  />
                </div>
                <div className="flex items-center justify-center px-2 font-semibold">
                  John Doe
                </div>
              </div>
            </div>
            {/* #079A92 */}
            <div className="bg-green-teal flex h-full w-full justify-center">
              <img
                src="/image/small-underconstruction.png"
                className="cursor-pointer object-contain"
              />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: ctx.query };
};

export default Dashboard;
