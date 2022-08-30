import { FC } from 'react';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';

type ILoginProps = {
  payload: any;
};

const Login: FC<ILoginProps> = (props) => {
  const { payload } = props;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Nest Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div>
          {payload}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: ctx.query };
};

export default Login;
