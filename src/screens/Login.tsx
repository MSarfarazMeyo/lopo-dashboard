import React, { useEffect } from "react";
import GoogleLoginButton from "../components/auth/google-login-button";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigation = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("authStatus");
    if (authStatus === "1") {
      navigation("/dashboard");
    }
  }, []);

  return (
    <div>
      <GoogleLoginButton />
    </div>
  );
};

export default Login;
