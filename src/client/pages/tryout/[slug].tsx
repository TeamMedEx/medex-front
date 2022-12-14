import { FC, useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import { Countdown } from 'react-daisyui';
import HeaderPage from '../../components/HeaderPage';
import { useSession } from 'next-auth/react';
import { nextauthOpts } from '../../../shared/next-auth/options';
import { unstable_getServerSession } from 'next-auth';
import type { GetServerSideProps } from 'next';

import examBg from '../../public/image/exam-vector.webp';

type ITryoutProps = {
   is_logged_in: boolean;
};

const TryoutDetail: FC<ITryoutProps> = () => {
   const { data: session } = useSession();
   const router = useRouter();

   const [hoursTime, setHoursTime] = useState(0);
   const [minutesTime, setMinutesTime] = useState(0);
   const [secondsTime, setSecondsTime] = useState(0);

   const [startTryout, setStartTryout] = useState(false);

   useEffect(() => {
      if (!session) router.push('/login');
   }, []);

   useEffect(() => {
      if (startTryout) {
         countDownTimer();
      }
   }, [startTryout]);

   let myTimer;
   const countDownTimer = () => {
      myTimer = setInterval(myClock, 1000);
      let c = 3610; //Initially set to 1 hour
      const initMinute = ((c - (c % 60)) / 60) % 60;
      setMinutesTime(initMinute);
      setHoursTime(((c - (c % 60)) / 60 - initMinute) / 60);

      function myClock() {
         --c;
         const seconds = c % 60; // Seconds that cannot be written in minutes
         const secondsInMinutes = (c - seconds) / 60; // Gives the seconds that COULD be given in minutes
         const minutes = secondsInMinutes % 60; // Minutes that cannot be written in hours
         const hours = (secondsInMinutes - minutes) / 60;
         // Now in hours, minutes and seconds, you have the time you need.
         // console.clear();
         // console.log(hours + ':' + minutes + ':' + seconds);
         setSecondsTime(seconds);
         if (seconds == 59) {
            setMinutesTime(minutes);
         }
         if (minutes == 59) {
            setHoursTime(hours);
         }
         if (c == 0) {
            clearInterval(myTimer);
         }
      }
   };

   const paginationBottom = () => {
      const totalPage = [];
      for (let index = 0; index < 100; index++) {
         if (index == 4) {
            totalPage.push(
               <button className="btn btn-warning m-1 h-2 w-3">
                  {index + 1}
               </button>,
            );
         } else if (index == 7) {
            totalPage.push(
               <button className="btn btn-primary m-1 h-2 w-3">
                  {index + 1}
               </button>,
            );
         } else if (index < 7) {
            totalPage.push(
               <button className="btn btn-success m-1 h-2 w-3">
                  {index + 1}
               </button>,
            );
         } else {
            totalPage.push(
               <button className="btn btn-outline m-1 h-2 w-3">
                  {index + 1}
               </button>,
            );
         }
      }
      return totalPage;
   };

   return (
      <div className="h-screen">
         <main className="h-full w-full">
            <div className="flex w-full px-5">
               <div className="w-3/12">
                  <div className="mt-5 flex justify-center">
                     <img
                        src="/medex-logo-1.svg"
                        width={150}
                        height={100}
                        className="cursor-pointer object-contain"
                        onClick={() => router.push('/')}
                     />
                  </div>
                  <div>
                     <div className="mt-8 flex w-full justify-center p-4">
                        <div className="stats stats-vertical w-64 bg-accent-focus text-center text-primary-content	shadow">
                           <div className="stat">
                              <div className="stat-figure">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="bi bi-list-ol h-7 w-7"
                                    viewBox="0 0 16 16"
                                 >
                                    <path
                                       fillRule="evenodd"
                                       d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"
                                    />
                                    <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z" />{' '}
                                 </svg>
                              </div>
                              <div className="">Jumlah Soal</div>
                              <div className="stat-value">100</div>
                           </div>

                           <div className="stat">
                              <div className="stat-figure">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="bi bi-check-square h-7 w-7"
                                    viewBox="0 0 16 16"
                                 >
                                    {' '}
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />{' '}
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />{' '}
                                 </svg>
                              </div>
                              <div className="">Sudah Dijawab</div>
                              <div className="stat-value">7</div>
                           </div>

                           <div className="stat">
                              <div className="stat-figure">
                                 <div className="stat-figure">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                       className="inline-block h-8 w-8 stroke-current"
                                    >
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                       ></path>
                                    </svg>
                                 </div>
                              </div>

                              <div className="">Ragu-ragu</div>
                              <div className="stat-value">1</div>
                           </div>
                           <div className="stat">
                              <div className="stat-figure">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="bi bi-ui-checks-grid h-8 w-8"
                                    viewBox="0 0 16 16"
                                 >
                                    <path d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zm9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-3zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0l2-2z" />
                                 </svg>
                              </div>

                              <div className="">Belum Dijawab</div>
                              <div className="stat-value">93</div>
                           </div>
                        </div>
                     </div>
                     <div className="flex justify-center">
                        <button
                           className="btn btn-wide"
                           onClick={() => router.push('/dashboard')}
                        >
                           Back to dashboard
                        </button>
                     </div>
                  </div>
               </div>
               <div className="w-9/12">
                  <HeaderPage title={'Tryout Paket 11 Juli 2022'} />
                  {!startTryout && (
                     <div>
                        <div className="hero rounded-lg bg-base-200">
                           <div className="hero-content flex-col py-14 px-10 lg:flex-row-reverse">
                              <img
                                 src={`${examBg.src}`}
                                 className="max-w-sm rounded-lg shadow-2xl"
                              />
                              <div>
                                 <h1 className="text-4xl font-bold">
                                    Sudah siap untuk memulai Tryout?{' '}
                                 </h1>
                                 <p className="py-6">
                                    Jika sudah siap untuk memulai ujian,
                                    silahkan klik tombol mulai ujian dibawah
                                    ini, selamat mengerjakan!
                                 </p>
                                 <div className="flex justify-center">
                                    <button
                                       className="btn btn-primary"
                                       onClick={() => {
                                          setStartTryout(true);
                                       }}
                                    >
                                       Mulai ujian
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
                  {startTryout && (
                     <div className="h-full w-full">
                        <div className="flex items-center justify-center">
                           <div className="grid auto-cols-max grid-flow-col gap-5 text-center">
                              <div className="rounded-box flex flex-col bg-rose-700 p-2 text-neutral-content">
                                 <Countdown
                                    className="font-mono text-5xl"
                                    value={hoursTime}
                                 />
                                 hours
                              </div>
                              <div className="rounded-box flex flex-col bg-rose-700 p-2 text-neutral-content">
                                 <Countdown
                                    className="font-mono text-5xl"
                                    value={minutesTime}
                                 />
                                 min
                              </div>
                              <div className="rounded-box flex flex-col bg-rose-700 p-2 text-neutral-content">
                                 <Countdown
                                    className="font-mono text-5xl"
                                    value={secondsTime}
                                 />
                                 sec
                              </div>
                           </div>
                        </div>
                        <div className="mt-8 grid grid-cols-12 pr-20">
                           <div className="text-xl font-bold">8.</div>
                           <div className="col-span-11">
                              <div className="">
                                 Lorem ipsum dolor sit amet, consectetur
                                 adipiscing elit. Donec feugiat odio feugiat,
                                 mattis libero vitae, porttitor mi. Sed nec elit
                                 ex. Donec mattis, turpis id interdum feugiat,
                                 augue dolor vulputate ipsum, in porta lorem
                                 nulla ut justo. Nunc eget pellentesque tortor,
                                 sed ornare sapien. Curabitur semper mauris quis
                                 tellus mollis, vitae imperdiet quam sodales.
                                 Nunc ultrices maximus orci in lacinia. Interdum
                                 et malesuada fames ac ante ipsum primis in
                                 faucibus.
                              </div>
                              <div className="mt-3">
                                 <div className="flex items-start py-2">
                                    <div>a.</div>
                                    <div className="px-2">
                                       <input
                                          type="radio"
                                          name="radio-1"
                                          className="radio px-3"
                                       />
                                    </div>{' '}
                                    <div>feugiat odio</div>
                                 </div>
                                 <div className="flex items-start py-2">
                                    <div>b.</div>
                                    <div className="px-2">
                                       <input
                                          type="radio"
                                          name="radio-1"
                                          className="radio px-3"
                                       />
                                    </div>{' '}
                                    <div>feugiat ipsum</div>
                                 </div>
                                 <div className="flex items-start py-2">
                                    <div>c.</div>
                                    <div className="px-2">
                                       <input
                                          type="radio"
                                          name="radio-1"
                                          className="radio px-3"
                                       />
                                    </div>{' '}
                                    <div>feugiat lacinia</div>
                                 </div>
                                 <div className="flex items-start py-2">
                                    <div>d.</div>
                                    <div className="px-2">
                                       <input
                                          type="radio"
                                          name="radio-1"
                                          className="radio px-3"
                                       />
                                    </div>{' '}
                                    <div>feugiat sapien</div>
                                 </div>
                                 <div className="flex items-start py-2">
                                    <div>e.</div>
                                    <div className="px-2">
                                       <input
                                          type="radio"
                                          name="radio-1"
                                          className="radio px-3"
                                       />
                                    </div>{' '}
                                    <div>feugiat malesuada</div>
                                 </div>
                              </div>
                              <div className="mt-10">
                                 <div className="flex w-full justify-between">
                                    <button className="btn">
                                       &#60;&#60; Previous
                                    </button>
                                    <button className="btn btn-warning">
                                       Ragu-ragu
                                    </button>
                                    <button className="btn">
                                       Next &#62;&#62;
                                    </button>
                                 </div>
                              </div>
                              <div className="my-10 flex w-full justify-center">
                                 <div className="text-center">
                                    {paginationBottom()}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>
            <Footer />
         </main>
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

export default TryoutDetail;
