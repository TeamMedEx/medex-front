import React, { useEffect } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Button, Card, Hero } from 'react-daisyui';
import heroBg from '../public/image/bg-hero.jpg';

import SideNav from '../components/Sidenav';
import HeaderPage from '../components/HeaderPage';
import { unstable_getServerSession } from 'next-auth';
import { nextauthOpts } from '../../shared/next-auth';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/configureStore';
import { decrement, increment, incrementByAmount } from '../redux/counter';

const Dashboard: NextPage = () => {
   const { data: session, status } = useSession();
   const router = useRouter();
   const count = useSelector((state: RootState) => state.counter.count);
   const dispatch = useDispatch();

   return (
      <>
         <div className="overflow-hidden">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
               <SideNav isLoggedIn={false} />
               <div className="lg:pl-[20rem]">
                  <div className="mx-auto max-w-3xl xl:ml-0 xl:max-w-5xl">
                     <HeaderPage
                        title={'Selamat Datang, Desmond!'}
                        subTitle={'Saatnya lulus UKPMPPD bersama Med-Ex'}
                     />
                     <main
                        id="content-wrapper"
                        className="prose-slate dark:prose-dark prose relative z-20"
                     >
                        <Hero
                           style={{
                              backgroundImage: `url(${heroBg.src})`,
                           }}
                           className="mt-5 mb-10 overflow-hidden rounded-sm"
                        >
                           <Hero.Overlay />
                           <Hero.Content className="flex gap-10 py-10">
                              <div>
                                 <img
                                    src="/image/3d-exam-boy.png"
                                    alt="3d-hero"
                                    className="w-[250px]"
                                 />
                              </div>
                              <div className="max-w-md text-white">
                                 <h1 className="text-3xl font-bold">
                                    Next UKMPPD Pada Tanggal 20 Desember 2022
                                 </h1>
                                 <p className="py-6">
                                    Persiapkan dirimu dengan maksimal untuk
                                    menghadapi ujian berikutnya, yuk pelajari
                                    semua materinya di platform Med-Ex!
                                 </p>

                                 <Button color="primary">Get Started</Button>
                              </div>
                           </Hero.Content>
                        </Hero>
                        <div className="grid grid-cols-3 gap-4">
                           <div className="w-full rounded-md border-2 p-4 shadow-md">
                              <div>Complete Course</div>
                              <div className="text-2xl font-bold">28</div>
                           </div>
                           <div className="w-full rounded-md border-2 p-4 shadow-md">
                              <div>Complete Course</div>
                              <div className="text-2xl font-bold">28</div>
                           </div>
                           <div className="w-full rounded-md border-2 p-4 shadow-md">
                              <div>Complete Course</div>
                              <div className="text-2xl font-bold">28</div>
                           </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 pt-10">
                           <Card
                              className="cursor-pointer"
                              onClick={() => router.push('/tryout')}
                           >
                              <Card.Image
                                 src="/image/bg-exam-medex-2.jpg"
                                 alt="Shoes"
                              />
                              <Card.Body>
                                 <Card.Title tag="h2">Tryout</Card.Title>
                                 <p>
                                    Daftar simulasi tryout UKMPPD, latihan
                                    sebelum ujian resmi.
                                 </p>
                              </Card.Body>
                           </Card>
                           <Card className="cursor-pointer">
                              <Card.Image
                                 src="/image/bg-exam-medex-3.jpg"
                                 alt="Shoes"
                              />
                              <Card.Body>
                                 <Card.Title tag="h2">
                                    Learning Class
                                 </Card.Title>
                                 <p>
                                    Pelajari semua materi yang berkaitan dengan
                                    UKMPPD di sini.
                                 </p>
                              </Card.Body>
                           </Card>
                           <Card className="cursor-pointer">
                              <Card.Image
                                 src="/image/bg-exam-medex-2.jpg"
                                 alt="Shoes"
                              />
                              <Card.Body>
                                 <Card.Title tag="h2">UKMPPD</Card.Title>
                                 <p>Daftar ujian UKMPPD.</p>
                              </Card.Body>
                           </Card>
                        </div>
                     </main>
                     <Footer />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
   const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      nextauthOpts,
   );

   if (!session) {
      return {
         redirect: {
            destination: '/login',
            permanent: false,
         },
      };
   }

   return {
      props: { session },
   };
};

export default Dashboard;
