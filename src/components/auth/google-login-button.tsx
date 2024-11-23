

import { FcGoogle } from "react-icons/fc";
import { handleGoogleLogin } from "../../hooks/useLogout";


const GoogleLoginButton = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign in to Dashboard
        </h3>
        <button
          onClick={handleGoogleLogin}
          className="w-full lex items-center justify-center mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Continue with Google
        </button>
      </div>
    </div>




  );
};

export default GoogleLoginButton;
