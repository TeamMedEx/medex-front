import { useRouter } from 'next/router';
import { BellIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';

type IHeaderPage = {
   title: string;
   subTitle: string;
   profile?: any;
};

const HeaderPage = ({ title, subTitle, profile }: IHeaderPage) => {
   const router = useRouter();

   return (
      <header id="header" className="relative z-50 px-0">
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
            <div className="dropdown-end dropdown">
               <label tabIndex={0} className="flex cursor-pointer flex-row">
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
               </label>
               <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box mt-4 w-52 bg-base-100 p-2 shadow"
               >
                  <li>
                     <a>Profile</a>
                  </li>
                  <li onClick={() => signOut()}>
                     <a>Logout</a>
                  </li>
               </ul>
            </div>
         </div>
      </header>
   );
};

export default HeaderPage;
