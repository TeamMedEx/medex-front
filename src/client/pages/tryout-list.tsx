import { FC, useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { nextauthOpts } from '../../shared/next-auth';
import { unstable_getServerSession } from 'next-auth';

import SideNav from '../components/Sidenav';
import HeaderPage from '../components/HeaderPage';
import { getExamList } from '../helper/Api/General';

const TryoutList: FC = () => {
   const router = useRouter();
   const [dataList, setDataList] = useState([]);

   useEffect(() => {
      getData();
   }, []);

   const getData = async () => {
      const body = { page: '1', limit: '10', search: '' };
      const result = await getExamList(body);
      console.log('isi list result : ', result);
      setDataList(result.data);
      return result;
   };

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
                           {dataList.length > 0 &&
                              dataList.map((val, i): any => {
                                 return (
                                    <div
                                       key={val._id}
                                       className="card-compact card image-full h-52 w-full bg-base-100 shadow-xl"
                                    >
                                       <figure>
                                          <img
                                             src="/image/bg-exam-medex-2.jpg"
                                             alt="Shoes"
                                          />
                                       </figure>
                                       <div className="card-body justify-between">
                                          <h2 className="card-title">
                                             {val.title}
                                          </h2>
                                          <div className="flex">
                                             <p>
                                                Jumlah soal : {} <br />
                                                Durasi : {
                                                   val.duration
                                                } Menit <br />
                                             </p>
                                             <p>
                                                Member : {val.type} <br />
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
                                 );
                              })}
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

export default TryoutList;
