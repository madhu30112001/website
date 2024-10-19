import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../contextapi/contextapi";
import Login from "./Login";
import ProfileComp from "./ProfileComp";
const Header = ({ headerClass = "" }) => {
  const { user } = useContext(StoreContext);
  return (
    <>
      
        <header className={`flex justify-between items-center ${headerClass}`}>
          <Link to={"/"} className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-68 -rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
            <span className=" font-bold text-xl ml-2">airbnb</span>
          </Link>
          <div className="hidden lg:px-4 sm:flex border gap-2 text-[18px] border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 ">
            <div className="lg:px-2">Anywhere</div>
            <div className="border border-l border-gray-300"></div>
            <div>Any week</div>
            <div className="border border-l border-gray-300"></div>

            <div>Add guests</div>
            <button className="w-[30px] h-[30px] bg-primary text-white p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
          <Link
            to={user ? "/account" : "/login"}
            className="flex items-center border gap-2 text-sm/[20px] border-gray-300 rounded-full py-2 px-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <div className="bg-gray-500 overflow-hidden text-white rounded-full border border-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 relative top-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {user ? (
              <div className="text-[20px]">{user.name}</div>
            ) : (
              <ProfileComp />
            )}
          </Link>
        </header>
        <hr className="mt-3 w-full " />

    </>
  );
};

export default Header;
