import React from "react";
import { useRouter } from "next/router";

function UpdateDeletePogs() {
  const router = useRouter();

  function navigateToHome() {
    router.push("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1>Update & Delete Pogs</h1>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded  mt-auto mb-12"
        onClick={navigateToHome}
      >
        Home
      </button>
    </div>
  );
}

export default UpdateDeletePogs;
