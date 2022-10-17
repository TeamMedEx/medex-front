/* eslint-disable @next/next/no-page-custom-font */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
   return (
      <SessionProvider session={pageProps['session']}>
         <Head>
            <title>Medical Exam Platform</title>
            <link rel="icon" href="/favicon.ico" />
            <link
               href="https://fonts.googleapis.com/css?family=Poppins&display=optional"
               rel="stylesheet"
            />
         </Head>
         <Component {...pageProps} />
      </SessionProvider>
   );
};

export default App;
