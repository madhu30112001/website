import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Login from "./pages/Login/Login";
import { useState } from "react";
const App = () => {
  const url = "http://localhost:4000";
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  return (
    <div>
      <ToastContainer />
      {token && (
        <div>
          <Navbar setToken={setToken} />
          <hr />
        </div>
      )}
      <div className={token?`app-content`:""}>
        {token && <Sidebar />}
        <Routes>
          {!token ? (
            <>
              <Route
                path="/"
                element={<Login setToken={setToken} url={url} />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/add" replace />} />
              <Route path="/add" element={<Add url={url} />} />
              <Route path="/list" element={<List url={url} />} />
              <Route path="/orders" element={<Orders url={url} />} />
              <Route path="*" element={<Navigate to="/add" replace />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
