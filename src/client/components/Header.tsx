/* eslint-disable @next/next/no-img-element */

function Header() {
  return (
    <header>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="/vercel.svg"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="customClass">Items 1</li>
          <li className="customClass">Items 2</li>
          <li className="customClass">Items 3</li>
          <li className="customClass">Items 4</li>
          <li className="customClass">Items 5</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
