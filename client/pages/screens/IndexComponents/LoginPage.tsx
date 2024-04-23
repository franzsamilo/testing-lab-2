import React from "react";
import useNavigation from "../Components&Constants/Navigation";

function LoginPage() {
  const { auth0LogIn } = useNavigation();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <button
        onClick={auth0LogIn}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
      >
        Login
      </button>
    </div>
  );
}

export default LoginPage;
