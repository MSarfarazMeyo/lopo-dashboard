import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import GoogleLoginButton from './components/auth/google-login-button';
import Login from './pages/Login';

function App() {

  const navigate = useNavigate();

  useEffect(() => {

    navigate("/login"); // Redirect to login if not authenticated

  }, [navigate]);

  return (

    <div className="App font-opensans">


      <Routes>
        <Route index path="/login" element={<Login />} />

        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comments />} />
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