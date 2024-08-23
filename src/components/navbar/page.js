import Link from "next/link";

function Navbar() {
  return (
    <div className="w-full mx-auto">
      <div className="navbar bg-base-100 px-5 rounded-b-[25px] lg:px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 text-lg rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">Books</Link>
              </li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-2xl font-bold">
            My Store
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu flex gap-3 text-xl italic menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">Books</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
