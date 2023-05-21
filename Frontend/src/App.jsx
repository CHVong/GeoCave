import React from "react";
import { Routes, Route } from "react-router-dom";
import Checklist from "./pages/content/Checklist";
import DashLayout from "./pages/DashLayout";
import Equipment from "./pages/content/Equipment";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Public from "./pages/Public";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Error404 from "./pages/Error404";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import Admin from "./pages/Admin";
import PersistLogin from "./components/PersistLogin";
import IsLoggedIn from "./components/IsLoggedIn";
import WorkLifeBalance from "./pages/content/WorkLifeBalance";
import Lab from "./pages/content/Lab";
import Office from "./pages/content/Office";
import Safety from "./pages/content/Safety";
import Templates from "./pages/content/Templates";
import Training from "./pages/content/Training";
import Field from "./pages/content/Field";
import Proposals from "./pages/content/Proposals";
import Permits from "./pages/content/Permits";
import SOPs from "./pages/content/SOPs";
import DataAnalysis from "./pages/content/DataAnalysis";
import Tests from "./pages/content/Tests";
import InactiveAccount from "./pages/InactiveAccount";

const App = () => {
  return (
    <div className="layout">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* PUBLIC ROUTES */}

          <Route element={<PersistLogin />}>
            <Route index element={<Public />} />
            <Route element={<IsLoggedIn />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Route>

          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="inactiveaccount" element={<InactiveAccount />} />

          {/* PRIVATE ROUTES */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={["Employee"]} allowedStatus={true} />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />
                <Route path="checklist">
                  <Route index element={<Checklist />} />
                </Route>
                <Route path="equipment">
                  <Route index element={<Equipment />} />
                </Route>
                <Route path="lab">
                  <Route index element={<Lab />} />
                </Route>
                <Route path="office">
                  <Route index element={<Office />} />
                </Route>
                <Route path="safety">
                  <Route index element={<Safety />} />
                </Route>
                <Route path="training">
                  <Route index element={<Training />} />
                </Route>
                <Route path="templates">
                  <Route index element={<Templates />} />
                </Route>
                <Route path="checkin">
                  <Route index element={<WorkLifeBalance />} />
                </Route>
                <Route path="field">
                  <Route index element={<Field />} />
                </Route>
                <Route path="permits">
                  <Route index element={<Permits />} />
                </Route>
                <Route path="proposals">
                  <Route index element={<Proposals />} />
                </Route>
                <Route path="SOPs">
                  <Route index element={<SOPs />} />
                </Route>
                <Route path="dataanalysis">
                  <Route index element={<DataAnalysis />} />
                </Route>
                <Route path="tests">
                  <Route index element={<Tests />} />
                </Route>
              </Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={["Admin"]} allowedStatus={true} />}>
              <Route path="dash" element={<DashLayout />}>
                <Route path="admin" element={<Admin />} />
              </Route>
            </Route>
          </Route>
        </Route>
        {/* CATCH ALL */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default App;
