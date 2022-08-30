/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';

function Header() {
  const router = useRouter();

  return (
    <header className="bg-white">
      <div className="flex bg-white items-center space-x-2 md:space-x-10">
        <img
          src="/medex-logo-1.svg"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="customClass">
            <a href="#home">Beranda</a>
          </li>
          <li className="customClass">
            <a href="#about">Tentang Kami</a>
          </li>
          <li className="customClass">Fitur Dan Layanan</li>
          <li className="customClass">FAQ</li>
        </ul>
      </div>
      <div className="flex items-center space-x-2 md:space-x-10">
        <ul className="hidden space-x-4 md:flex">
          <li className="customClass" onClick={() => router.push('/login')}>
            Login
          </li>
          <li className="customClass" onClick={() => router.push('/register')}>
            Register
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
