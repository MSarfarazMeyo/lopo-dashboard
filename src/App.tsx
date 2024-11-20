import React from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import GoogleLoginButton from './components/auth/google-login-button';

function App() {
  return (

    <div className="App font-opensans">


      <Routes>
        <Route index path="/" element={<GoogleLoginButton />} />
      </Routes>
    </div>

  );
}

export default App;