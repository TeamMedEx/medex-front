import React, { FC, useEffect, useState } from 'react';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import Header from '../components/Header';

type IHomeProps = {
  payload: any;
};

const Home: FC<IHomeProps> = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const listUser = async () => {
      const response = await fetch('api/listUser');
      const data = await response.json();
      console.log('data front : ', data.records);
      setUsers(data.records);
    };
    listUser().catch(console.error);
  }, []);

  const { payload } = props;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Nest Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div>
          {users?.map((val, i) => {
            return (
              <React.Fragment key={i}>
                <div className='bg-black w-10'>Email : {val.email}</div>
                <div>User name : {val.username}</div>
              </React.Fragment>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // console.log(ctx)
  return { props: ctx.query };
};

export default Home;
