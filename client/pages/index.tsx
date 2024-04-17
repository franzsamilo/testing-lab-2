/* eslint-disable react-hooks/rules-of-hooks */

import React from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";

function index() {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  function navigateToCreatePogs() {
    router.push("/screens/AddPogs/AddPogs");
  }

  function navigateToReadPogs() {
    router.push("/screens/ReadPogs/ReadPogs");
  }

  function auth0LogOut() {
    router.push("/api/auth/logout");
  }

  function auth0LogIn() {
    router.push("/api/auth/login");
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-wrap justify-center items-center">
          <aside className="w-full p-32 bg-white rounded-lg shadow-md mr-4">
            <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
            <p className="text-lg">
              Username: {user.name}
              <br />
              Email: {user.email}
              <br />
            </p>
            <div className="mt-8">
              <button
                onClick={navigateToCreatePogs}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md mb-4"
              >
                Add a Pog
              </button>
              <button
                onClick={navigateToReadPogs}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-3 rounded-lg shadow-md"
              >
                My Pogs
              </button>
            </div>
          </aside>
        </div>
        <button
          onClick={auth0LogOut}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md mt-4"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onClick={auth0LogIn}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md mt-4"
      >
        Login
      </button>
    </div>
  );
}

export default index;
