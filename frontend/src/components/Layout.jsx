import React, { useContext, useState } from "react";
import Header from "./Header";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import Footer from "./Footer";
const Layout = () => {
  const location = useLocation();
  const isSpecialPage = matchPath("/places/:id", location.pathname);
  // const loginPage = matchPath("/login", location.pathname);
  const loginPage=["/login", "/register"].includes(location.pathname);

  const headerstyle = isSpecialPage ? "py-3 px-4" : "py-3 px-4";

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        headerClass={headerstyle}
        isSpecialPage={isSpecialPage}
        loginPage={loginPage}
            />

      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
