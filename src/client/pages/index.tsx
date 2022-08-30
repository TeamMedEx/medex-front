import { FC, Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import Header from '../components/Header';

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
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div>
          {users &&
            users.map((val, i) => {
              return (
                <Fragment key={i}>
                  <div className="w-10 bg-black">Email : {val.email}</div>
                  <div>User name : {val.username}</div>
                </Fragment>
              );
            })}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: ctx.query };
};

export default Home;
