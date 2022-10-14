import { FC, useEffect } from 'react';
import type { GetServerSideProps } from 'next';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import SideNav from '../components/Sidenav';
import HeaderPage from '../components/HeaderPage';

const TryoutList: FC = () => {
   const { data: session } = useSession();
   const router = useRouter();

   useEffect(() => {
      if (!session) router.push('/login');
   }, []);

   return (
      <div className="overflow-hidden">
         <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
            <SideNav isLoggedIn={false} />
            <div className="lg:pl-[20rem]">
               <div className="mx-auto max-w-3xl xl:ml-0 xl:max-w-5xl">
                  <HeaderPage
                     title={'Tryout'}
                     subTitle={'Daftar tryout yang bisa kamu ikuti'}
                  />
                  <main
                     id="content-wrapper"
                     className="prose-slate dark:prose-dark prose relative z-20"
                  >
                     <div className="h-full w-full grid-cols-3 overflow-y-auto">
                        <div className="grid grid-cols-3 gap-4">
                           <div className="card-compact card image-full h-52 w-full bg-base-100 shadow-xl">
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
                                       onClick={() => router.push('/tryout')}
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
                                       onClick={() => router.push('/tryout')}
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
                                       onClick={() => router.push('/tryout')}
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
                                       onClick={() => router.push('/tryout')}
                                    >
                                       Mulai
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </main>
                  <Footer />
               </div>
            </div>
         </div>
      </div>
   );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
   return { props: ctx.query };
};

export default TryoutList;
