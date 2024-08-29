import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="navbar text-white">
          <div className="navbar-start">
            <div className="dropdown">
              <button
                tabIndex={0}
                className="btn btn-ghost lg:hidden"
                aria-label="Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white text-black rounded-box w-52 z-10"
              >
                <li>
                  <Link href="/">Books</Link>
                </li>
                <li>
                  <Link href="/createBook">Create Book</Link>
                </li>
              </ul>
            </div>
            <Link href="/" className="btn btn-ghost text-xl font-bold">
              BookStore
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-4">
              <li>
                <Link href="/" className="hover:text-gray-200 transition">
                  Books
                </Link>
              </li>
              <li>
                <Link
                  href="/createBook"
                  className="hover:text-gray-200 transition"
                >
                  Create Book
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
                aria-label="User Menu"
              >
                <div className="w-10 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="User Avatar"
                  />
                </div>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white text-black rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
