import React from "react";
import { Routes, Route } from "react-router-dom";
import Checklist from "./components/checklist";
import DashLayout from "./components/DashLayout";
import Equipment from "./components/equipment";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Public from "./components/Public";
import Welcome from "./components/Welcome";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
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
    </Routes>
  );
};

export default App;
