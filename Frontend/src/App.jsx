import React from "react";
import { Routes, Route } from "react-router-dom";
import Checklist from "./pages/checklist";
import DashLayout from "./pages/DashLayout";
import Equipment from "./pages/equipment";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Public from "./pages/Public";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Error404 from "./pages/Error404";

const App = () => {
  return (
    <div className="layout">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dash" element={<DashLayout />}>
            <Route index element={<Welcome />} />
            <Route path="checklist">
              <Route index element={<Checklist />} />
            </Route>
            <Route path="equipment">
              <Route index element={<Equipment />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default App;
