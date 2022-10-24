import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import {
   ArchiveBoxIcon,
   ArrowLeftOnRectangleIcon,
   BeakerIcon,
   HomeIcon,
   NewspaperIcon,
} from '@heroicons/react/24/outline';

function SideNav({ isLoggedIn }) {
   const router = useRouter();

   return (
      <div className="fixed inset-0 left-[2rem] right-auto z-20 hidden w-[18rem] overflow-y-auto border-r-2 px-8 pb-10 lg:block">
         <div className="flex justify-center pt-[1.5rem]">
            <img
               src="/medex-logo-1.svg"
               width={150}
               height={100}
               className="cursor-pointer object-contain"
               onClick={() => router.push('/')}
            />
         </div>
         <div>
            <ul className="mt-10 ml-5">
               <li className="rounded-lg px-5 py-2  hover:bg-gray-200">
                  <a className="flex cursor-pointer" onClick={() => router.push('/dashboard')}>
                     <HomeIcon className="mr-2 h-6 w-6 text-black" />
                     Dashboard
                  </a>
               </li>
               <li className="rounded-lg px-5 py-2  hover:bg-gray-200">
                  <a className="flex cursor-pointer" onClick={() => router.push('/tryout')}>
                     <NewspaperIcon className="mr-2 h-6 w-6 text-black" />
                     Tryout
                  </a>
               </li>
               <li className="flex rounded-lg px-5 py-2  hover:bg-gray-200">
                  <BeakerIcon className="mr-2 h-6 w-6 text-black" />
                  Learning
               </li>
               <li className="flex rounded-lg px-5 py-2  hover:bg-gray-200">
                  <ArchiveBoxIcon className="mr-2  h-6 w-6 text-black" />
                  Package
               </li>
               <li className="rounded-lg px-5 py-2  hover:bg-gray-200">
                  <a className="flex cursor-pointer" onClick={() => signOut()}>
                     <ArrowLeftOnRectangleIcon className="mr-2  h-6 w-6 text-black" />
                     Logout
                  </a>
               </li>
            </ul>
         </div>
      </div>
   );
}

export default SideNav;
