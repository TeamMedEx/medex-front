/* eslint-disable @next/next/no-img-element */
import { FC, Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

type IHomeProps = {
  payload: any;
};

const Home: FC<IHomeProps> = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const listUser = async () => {
      const response = await fetch('api/listUser');
      const data = await response.json();
      setUsers(data.records);
    };
    listUser().catch(console.error);
  }, []);

  // const { payload } = props;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Nest Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
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
            <div className="text-4xl text-blue-900 font-semibold ">
              Platform persiapan UKMPPD berbasis teknologi pertama dan terbesar
              di indonesia
            </div>
            <div className="text-xl text-gray-500 font-normal mt-2">
              Akses belajar seru dan efektif dengan program Tryout online dan
              bimbel online untuk persiapan UKMPPD dengan kualitas terbaik dan
              terpercaya
            </div>
          </div>
          <div className="flex justify-between pt-10">
            <div className="rounded-lg p-10 w-80 align text-left shadow-xl">
              <div className="text-2xl text-black font-semibold">
                Apa itu Medex?
              </div>
              <div className="pt-2 text-xl text-gray-500">
                Medex adalah platform kedokteran berbasis online terbesar dan
                pertama di indonesia, yang membantu Kamu siap UKMPPD
              </div>
            </div>
            <div className="rounded-lg p-10 w-80 align text-left shadow-xl">
              <div className="text-2xl text-black font-semibold">
                Tonton Video
              </div>
              <div className="pt-2 text-xl text-gray-500">
                Fitur ini memungkinkan kamu untuk mempelajari semua materi
                kedokteran yang sudah di rancang khusus melalui video online
              </div>
            </div>
            <div className="rounded-lg p-10 w-80 align text-left shadow-xl">
              <div className="text-2xl text-black font-semibold">
                Tryout Online
              </div>
              <div className="pt-2 text-xl text-gray-500">
                Program andalah terdiri dari 16 paket, pastinya akan membuat
                kamu semakin siap menghadapi ujian UKMPPD
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          {users &&
            users.map((val, i) => {
              return (
                <Fragment key={i}>
                  <div className="w-10 bg-black">Email : {val.email}</div>
                  <div>User name : {val.username}</div>
                </Fragment>
              );
            })}
        </div> */}
        <Footer />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: ctx.query };
};

export default Home;
