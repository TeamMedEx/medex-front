import { FC } from 'react';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

type IHomeProps = {
  is_logged_in: boolean;
};

const Home: FC<IHomeProps> = ({ is_logged_in }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Medical Exam Platform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isLoggedIn={is_logged_in} />

      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
        <div id="home">
          <img
            src="/image/slide5.jpg"
            width="100%"
            className="cursor-pointer object-contain"
          />
        </div>
        <div id="about" className="w-4/5">
          <div className="w-full">
            <div className="text-4xl font-semibold text-blue-900 ">
              Platform persiapan UKMPPD berbasis teknologi pertama dan terbesar
              di indonesia
            </div>
            <div className="mt-2 text-xl font-normal text-gray-500">
              Akses belajar seru dan efektif dengan program Tryout online dan
              bimbel online untuk persiapan UKMPPD dengan kualitas terbaik dan
              terpercaya
            </div>
          </div>
          <div className="flex justify-between pt-10">
            <div className="align w-80 rounded-lg p-10 text-left shadow-xl">
              <div className="text-2xl font-semibold text-black">
                Apa itu Medex?
              </div>
              <div className="pt-2 text-xl text-gray-500">
                Medex adalah platform kedokteran berbasis online terbesar dan
                pertama di indonesia, yang membantu Kamu siap UKMPPD
              </div>
            </div>
            <div className="align w-80 rounded-lg p-10 text-left shadow-xl">
              <div className="text-2xl font-semibold text-black">
                Tonton Video
              </div>
              <div className="pt-2 text-xl text-gray-500">
                Fitur ini memungkinkan kamu untuk mempelajari semua materi
                kedokteran yang sudah di rancang khusus melalui video online
              </div>
            </div>
            <div className="align w-80 rounded-lg p-10 text-left shadow-xl">
              <div className="text-2xl font-semibold text-black">
                Tryout Online
              </div>
              <div className="pt-2 text-xl text-gray-500">
                Program andalah terdiri dari 16 paket, pastinya akan membuat
                kamu semakin siap menghadapi ujian UKMPPD
              </div>
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

export default Home;
