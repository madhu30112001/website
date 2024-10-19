import React from "react";
import Header from "./Header";
import { Outlet, useLocation,matchPath } from "react-router-dom";
const Layout = () => {
  const location=useLocation()

  const isSpecialPage = matchPath("/places/:id", location.pathname);
  console.log(isSpecialPage);
  const headerstyle=isSpecialPage ? "sm:mx-10 md:mx-5 lg:mx-[13.5em]" :"sm:mx-2 md:mx-8 lg:mx-[4.5em]"

  return (
    <div className="p-3 flex flex-col min-h-screen">
      <Header headerClass={headerstyle} />

      <Outlet />
    </div>
  );
};

export default Layout;
