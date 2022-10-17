import { useRouter } from 'next/router';
import { BellIcon } from '@heroicons/react/24/outline';

type IHeaderPage = {
   title: string;
   subTitle: string;
   profile?: any;
};

const HeaderPage = ({ title, subTitle, profile }: IHeaderPage) => {
   const router = useRouter();

   return (
      <header id="header" className="relative z-20 px-0">
         <div className="">
            <div className="flex items-center px-2 text-2xl font-semibold">
               {title}
            </div>
            {subTitle && (
               <div className="flex items-center px-2 text-gray-500">
                  {subTitle}
               </div>
            )}
         </div>
         <div className="flex items-center">
            <BellIcon className="mr-4 h-6 w-6 text-black" />
            <div className="avatar">
               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-base-300">
                  <img
                     src="/image/desmond-pp.jpg"
                     className="cursor-pointer !object-contain"
                  />
               </div>
            </div>
            <div className="flex items-center justify-center px-2 font-semibold">
               Desmond Doe
            </div>
         </div>
      </header>
   );
};

export default HeaderPage;
