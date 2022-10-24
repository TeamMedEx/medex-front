import React, { FC, useEffect, useState, Fragment } from 'react';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import { Countdown } from 'react-daisyui';
import HeaderPage from '../../components/HeaderPage';
import { useSession } from 'next-auth/react';
import { nextauthOpts } from '../../../shared/next-auth/options';
import { unstable_getServerSession } from 'next-auth';
import type { GetServerSideProps } from 'next';
import isEmpty from 'lodash/isEmpty';

import examBg from '../../public/image/exam-vector.webp';
import { getDetailExam } from '../../helper/Api/General';
import {
   encryptData,
   isEmptyValues,
   minuteToSecond,
} from '../../helper/Common';
import { setLocalStorage } from '../../helper/LocalStorage';
import dayjs from 'dayjs';
import CountDownExam from '../../components/Countdown';

type ITryoutProps = {
   is_logged_in: boolean;
};

const TryoutDetail: FC<ITryoutProps> = () => {
   const { data: session } = useSession();
   const router = useRouter();
   const [startTryout, setStartTryout] = useState(false);
   const [examData, setExamData] = useState<{ [key: string]: any }>({});
   const [examActivity, setExamActivity] = useState<{ [key: string]: any }>({
      examId: '',
      totalQuestion: 0,
      totalAnswered: 0,
      indecisive: 0,
      notAnswered: 0,
      startedAt: '',
      duration: 0,
      exam: [],
   });
   const [activeQuestion, setActiveQuestion] = useState(0);

   useEffect(() => {
      if (startTryout) {
         // countDownTimer();
      } else {
         getExamData();
      }
   }, [startTryout]);

   const getExamData = async () => {
      const { data } = await getDetailExam(router.query.slug);
      const body = {
         examId: data._id,
         totalQuestion: data.questions.length,
         totalAnswered: 0,
         indecisive: 0,
         notAnswered: data.questions.length,
         startedAt: '',
         duration: data.duration,
         exam: data.questions,
      };
      setLocalStorage('examActivity', encryptData(body));
      setExamActivity(body);
      setExamData(data);
      return data;
   };

   const selectQuestion = (id) => {
      setActiveQuestion(id);
   };

   const paginationBottom = () => {
      return examActivity?.exam?.map((val, i) => {
         const emptyAnswer = isEmpty(examActivity?.exam[i]?.answer);
         const emptyIndecisive = isEmpty(examActivity?.exam[i]?.indecisive);

         const checkCondition = () => {
            let result = 'btn-outline';
            if (activeQuestion == i) {
               result = 'btn-primary';
            } else if (
               emptyAnswer == false &&
               examActivity?.exam[i]?.indecisive == true
            ) {
               result = 'btn-warning';
            } else if (
               emptyAnswer == false &&
               examActivity?.exam[i]?.indecisive == false
            ) {
               result = 'btn-success';
            } else if (emptyAnswer == false && emptyIndecisive == true) {
               result = 'btn-success';
            }

            return result;
         };
         return (
            <button
               key={i}
               className={`btn ${checkCondition()} m-1 h-2 w-3 `}
               onClick={() => selectQuestion(i)}
            >
               {i + 1}
            </button>
         );
      });
   };

   const optionsFormat = (index) => {
      const format = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e' };
      return format[index];
   };

   const startExam = () => {
      setStartTryout(true);
      const body = {
         ...examActivity,
         startedAt: dayjs().format(),
      };
      setExamActivity(body);
   };

   const prevQuestion = () => {
      if (activeQuestion + 1 !== 1) setActiveQuestion(activeQuestion - 1);
   };

   const nextQuestion = () => {
      if (examActivity.exam.length != activeQuestion + 1)
         setActiveQuestion(activeQuestion + 1);
   };

   const checkStatsCount = (data) => {
      let totalAnswered = 0;
      let totalIndecisive = 0;

      data?.exam?.forEach((val, i) => {
         if (!isEmptyValues(val.answer) && isEmptyValues(val.indecisive)) {
            totalAnswered += 1;
         } else if (
            !isEmptyValues(val.answer) &&
            !isEmptyValues(val.indecisive) &&
            val?.indecisive == false
         ) {
            totalAnswered += 1;
         } else if (
            !isEmptyValues(val.answer) &&
            !isEmptyValues(val.indecisive) &&
            val.indecisive == true
         ) {
            totalIndecisive += 1;
         }
      });
      data.totalAnswered = totalAnswered;
      data.indecisive = totalIndecisive;
      data.notAnswered = data.totalQuestion - (totalAnswered + totalIndecisive);
      return data;
   };

   const toggleAnswer = (e, index) => {
      const dataTemp = { ...examActivity };
      dataTemp.exam[index].answer = e.currentTarget.value;

      const dataAfterCheck = checkStatsCount(dataTemp);

      setExamActivity(dataAfterCheck);
   };

   const toggleIndecisive = (index) => {
      const dataTemp = { ...examActivity };
      dataTemp.exam[index].indecisive = !dataTemp.exam[index].indecisive;
      const dataAfterCheck = checkStatsCount(dataTemp);
      setExamActivity(dataAfterCheck);
   };

   const doubtCondition = () => {
      let result;
      if (examActivity?.exam[activeQuestion]?.answer == undefined) {
         result = true;
      } else if (examActivity?.exam[activeQuestion]?.answer != '') {
         result = false;
      }
      return result;
   };

   console.log('isi examActivity : ', examActivity);

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
                              <div className="stat-value">
                                 {examActivity.totalQuestion}
                              </div>
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
                              <div className="stat-value">
                                 {examActivity.totalAnswered}
                              </div>
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
                              <div className="stat-value">
                                 {examActivity.indecisive}
                              </div>
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
                              <div className="stat-value">
                                 {examActivity.notAnswered}
                              </div>
                           </div>
                        </div>
                     </div>
                     {startTryout && (
                        <div className="flex justify-center pt-5">
                           <button
                              className="btn btn-success btn-wide text-lg"
                              disabled={examActivity.notAnswered != 0}
                              // onClick={() => router.push('/dashboard')}
                           >
                              Selesai Ujian
                           </button>
                        </div>
                     )}
                     {!startTryout && (
                        <div className="flex justify-center">
                           <button
                              className="btn btn-wide"
                              onClick={() => router.push('/dashboard')}
                           >
                              Back to dashboard
                           </button>
                        </div>
                     )}
                  </div>
               </div>
               <div className="w-9/12">
                  <HeaderPage title={examData?.title} />
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
                                       onClick={() => startExam()}
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
                           <CountDownExam
                              start={startTryout}
                              duration={minuteToSecond(examActivity?.duration)}
                           />
                        </div>
                        <div className="mt-8 grid grid-cols-12 pr-20">
                           {examActivity?.exam.map((val, i) => {
                              if (activeQuestion == i)
                                 return (
                                    <Fragment key={i}>
                                       <div className="text-xl font-bold">
                                          {i + 1}.
                                       </div>
                                       <div
                                          className={`col-span-11 ${
                                             val?.indecisive
                                                ? 'border-2 border-warning'
                                                : ''
                                          }`}
                                       >
                                          <div className="">{val.title}</div>
                                          <div className="mt-3">
                                             {val.options.map((data, index) => {
                                                return (
                                                   <Fragment key={index}>
                                                      <div className="form-control">
                                                         <label className="label flex cursor-pointer items-start justify-start py-2">
                                                            <span className="label-text">
                                                               {optionsFormat(
                                                                  index,
                                                               )}
                                                               .
                                                            </span>
                                                            <div className="px-2">
                                                               <input
                                                                  type="radio"
                                                                  name="radio-1"
                                                                  className="radio px-3 checked:bg-blue-500"
                                                                  value={
                                                                     data._id
                                                                  }
                                                                  checked={
                                                                     examActivity
                                                                        .exam[i]
                                                                        ?.answer ==
                                                                     data._id
                                                                  }
                                                                  onChange={(
                                                                     e,
                                                                  ) =>
                                                                     toggleAnswer(
                                                                        e,
                                                                        i,
                                                                     )
                                                                  }
                                                               />
                                                            </div>
                                                            <span className="label-text">
                                                               {data.value}
                                                            </span>
                                                         </label>
                                                      </div>
                                                   </Fragment>
                                                );
                                             })}
                                          </div>
                                       </div>
                                    </Fragment>
                                 );
                           })}
                        </div>
                        <div className="px-20">
                           <div className="mt-10">
                              <div className="flex w-full justify-between">
                                 <button
                                    className="btn"
                                    onClick={() => prevQuestion()}
                                 >
                                    &#60; Previous
                                 </button>
                                 <button
                                    className="btn btn-warning"
                                    disabled={doubtCondition()}
                                    onClick={() =>
                                       toggleIndecisive(activeQuestion)
                                    }
                                 >
                                    Ragu-ragu
                                 </button>
                                 <button
                                    className="btn"
                                    onClick={() => nextQuestion()}
                                 >
                                    Next &#62;
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
                  )}
                  {/* {startTryout && (
                     <div className="h-full w-full">
                        <div className="flex items-center justify-center">
                           <CountDownExam start={startTryout} />
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
                           </div>
                        </div>
                        <div className='px-20'>
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
                  )} */}
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
