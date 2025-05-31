import React, { useContext, useRef, useState, useEffect } from "react"; // ⬅️ updated
import { Link, useNavigate } from "react-router-dom"; // ⬅️ updated
import { StoreContext } from "../contextapi/contextapi";
import Login from "./Login";
import ProfileComp from "./ProfileComp";
const Header = ({
  headerClass = "",
  isSpecialPage = false,
  loginPage = "",
}) => {
  const { user } = useContext(StoreContext);
  const [showDropdown, setShowDropdown] = useState(false); // ⬅️ added
  const dropdownRef = useRef(null); // ⬅️ added
  const navigate = useNavigate(); // ⬅️ added

  const toggleDropdown = () => setShowDropdown((prev) => !prev); // ⬅️ added

  const handleNavigation = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`w-full ${loginPage ? "h-20" : ""} flex items-center justify-between bg-gradient-to-b from-white to-gray-100 ${headerClass}`}
      >
        <div className="">
          <Link
            to={"/"}
            className={`${!isSpecialPage && "lg:mb-24"} ${loginPage && "mb-1"} flex items-center `}
          >
            {/* <svg
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
            </svg> */}
            <img
              src="src/assets/images/main_icon.png"
              className="w-12 h-12"
              alt=""
            />
            <span className="font-bold text-xl ml-2">Nesto</span>
          </Link>
        </div>
        {!loginPage && (
          <div
            className={`hidden sm:flex flex-col items-center gap-10 w-full ${isSpecialPage ? "" : "h-[9rem]"}`}
          >
            {!isSpecialPage && (
              <div className="flex gap-5 justify-center items-center">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    shape-rendering="geometricPrecision"
                    text-rendering="geometricPrecision"
                    image-rendering="optimizeQuality"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    className="w-8 h-8 "
                    viewBox="0 0 512 473.763"
                  >
                    <path
                      fill-rule="nonzero"
                      d="M9.005 183.371a12.09 12.09 0 012.537-2.598L248.016 2.406c4.177-3.127 10.077-3.288 14.458 0l115.875 87.017V70.365c-5.821-.01-10.537-4.731-10.537-10.552V34.589c0-5.827 4.725-10.551 10.552-10.551h83.575c5.827 0 10.552 4.724 10.552 10.551v25.224c0 5.824-4.719 10.545-10.54 10.552v81.843l36.413 27.344a12.04 12.04 0 012.185 1.85c30.558 32.907-5.7 80.853-42.52 71.541v207.555c0 7.325-5.94 13.265-13.265 13.265H64.878c-7.325 0-13.265-5.94-13.265-13.265V252.147c-36.464 7.471-67.578-36.805-42.608-68.776z"
                    />
                    <path
                      fill="#E2E9E3"
                      d="M256.738 100.953l188.026 145.986v213.559h-53.971l.003-.158V314.242c0-5.554-4.368-10.057-9.755-10.057H280.904c-5.387 0-9.755 4.503-9.755 10.057V460.34l.003.158H64.878V247.094l191.86-146.141zM128.599 304.389H235.24c5.554 0 10.056 4.411 10.056 9.853v83.429c0 5.442-4.502 9.853-10.056 9.853H128.599c-5.554 0-10.057-4.411-10.057-9.853v-83.429c0-5.442 4.503-9.853 10.057-9.853z"
                    />
                    <path
                      fill="#CCD2CD"
                      d="M256.738 100.953l14.222 11.056L90.132 255.99l-3.339 204.508H63.784l1.094-213.58z"
                    />
                    <path
                      fill="#E2534B"
                      d="M451.399 70.365v73.919l-62.498-46.937V70.365z"
                    />
                    <path
                      fill="#E2E9E3"
                      d="M378.364 34.589h83.575v25.225h-83.575z"
                    />
                    <path
                      fill="#E2534B"
                      d="M18.794 190.38c-20.167 25.077 9.009 61.919 38.549 47.153l199.49-151.768 193.23 150.203c28.924 21.505 66.555-19.596 41.678-46.372L255.268 12.012 18.794 190.38z"
                    />
                    <path
                      fill="#CC4B44"
                      d="M18.794 190.38c-15.914 23.528.939 31.801 30.48 17.035l206.711-155.24L278.79 29.68l-23.522-17.668L18.794 190.38z"
                    />
                    <path
                      fill="#E2534B"
                      d="M280.904 314.242h100.137V460.34H280.904V314.242zm84.174 62.882l4.357 2.208a2.33 2.33 0 011.276 2.073l.006 16.078a2.333 2.333 0 01-1.899 2.29l-4.314 1.249a2.316 2.316 0 01-2.868-1.583l-.095-.644-.009-19.687a2.331 2.331 0 013.546-1.984z"
                    />
                    <path
                      fill="#CC4B44"
                      d="M280.904 314.242h100.137v2.755c-118.269-.246-91.937 43.89-91.937 143.343h-8.2V314.242z"
                    />
                    <path
                      fill="#fff"
                      d="M128.599 314.242H176.7v37.695h-47.861l-.24.009v-37.704zm56.14 0h50.501v37.853a4.022 4.022 0 00-1.121-.158h-49.38v-37.695zm50.501 45.576v37.853h-50.501v-37.695h49.38c.389 0 .766-.055 1.121-.158zm-58.54 37.853h-48.101v-37.704l.24.009H176.7v37.695z"
                    />
                    <path d="M253.533 182.475c14.176 0 25.67 11.49 25.67 25.669 0 14.177-11.494 25.67-25.67 25.67-14.18 0-25.67-11.493-25.67-25.67 0-14.179 11.49-25.669 25.67-25.669z" />
                  </svg>
                  <span>Homes</span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="src/assets/images/parachute.png"
                    className="w-8"
                    alt=""
                  />
                  <span>Experiences</span>
                </div>
                <div className="flex items-center gap-2 ">
                  <img
                    src="src/assets/images/service.png"
                    className="w-8"
                    alt=""
                  />
                  <span>Services</span>
                </div>
              </div>
            )}

            <div
              className={`hidden sm:flex md:flex border text-sm border-gray-300 rounded-full items-center py-2 px-2 shadow-md shadow-gray-300`}
            >
              <div className="px-8 sm:px-10 md:px-10 lg:px-20">Anywhere</div>
              <div className="border-l h-5"></div>
              <div className="px-8 sm:px-10 md:px-10 lg:px-20">Any week</div>
              <div className="border-l h-5"></div>

              <div className="px-8 sm:px-10 md:px-10 lg:px-20">Add guests</div>
              <button className=" bg-primary text-white p-1.5 rounded-full">
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
          </div>
        )}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className={`${!isSpecialPage && "sm:mt-0 lg:mb-24"} ${loginPage && "mb-1 sm:mt-0"} flex items-center border gap-2 text-sm border-gray-300 rounded-full py-2 px-4`}
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
            <span className="hidden sm:block text-base">
              {user ? user.name : <ProfileComp />}
            </span>
          </button>

          {/* 👇 Dropdown menu */}
          {showDropdown && user && (
            <div className="absolute right-0 top-10 mt-2 bg-white border shadow-md rounded-md w-48 z-50">
              <button
                onClick={() => handleNavigation("/account")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={() => handleNavigation("/account/bookings")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                My Bookings
              </button>
              <button
                onClick={() => handleNavigation("/account/places")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                My Accommodations
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
