import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./screens/Login";

import DashboardLayout from "./layout/DashboardLayout";
import Home from "./screens/Home";
import ManageContests from "./screens/contests/ManageContests";
import ContestForm from "./screens/contests/ContextForm";
import ManageUsers from "./screens/users/ManageUsers ";
import UserDetails from "./screens/users/UserDetails";
import GeneralSettings from "./screens/settings/GeneralSettings";

function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="contests" element={<ManageContests />} />
          <Route path="contests/:action" element={<ContestForm />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="users/:anction" element={<UserDetails />} />

          <Route path=":page" element={<GeneralSettings />} />
          <Route path=":page" element={<GeneralSettings />} />
        </Route>

        {/*  <Route path="comments" element={<Comments />} />
          <Route path="posts/manage" element={<ManagePosts />} />
          <Route path="posts/manage/edit/:slug" element={<EditPost />} />
          <Route path="/admin/chat" element={<ChatScreen />} />

          <Route path="/admin/doctors/manage" element={<ManageDoctors />} />
          <Route path="/admin/doctor/profile" element={<EditDoctor />} />

          <Route path="/admin/manager/manage" element={<ManageManagers />} />
          <Route path="/admin/manager/profile" element={<EditManager />} />

          <Route path="categories/manage" element={<Categories />} />
          <Route
            path="categories/manage/edit/:slug"
            element={<EditCategories />}
          />
          <Route path="users/manage" element={<Users />} />
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
