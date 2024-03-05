/* eslint-disable react-hooks/rules-of-hooks */

import React from "react";
import { useRouter } from "next/router";

function index() {
  const router = useRouter();

  function navigateToCreatePogs() {
    router.push("/screens/AddPogs/AddPogs");
  }

  function navigateToReadPogs() {
    router.push("/screens/ReadPogs/ReadPogs");
  }

  function navigateToUpdateDeletePogs() {
    router.push("/screens/Update&DeletePogs/UpdateDeletePogs");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Pogs Management</h1>
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={navigateToCreatePogs}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Pogs
        </button>
        <button
          onClick={navigateToReadPogs}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Read Pogs
        </button>
        <button
          onClick={navigateToUpdateDeletePogs}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Update/Delete Pogs
        </button>
      </div>
    </div>
  );
}

export default index;
