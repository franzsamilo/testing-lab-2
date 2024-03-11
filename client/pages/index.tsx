/* eslint-disable react-hooks/rules-of-hooks */

import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

function index() {
  const router = useRouter();

  function navigateToCreatePogs() {
    router.push("/screens/AddPogs/AddPogs");
  }

  function navigateToReadPogs() {
    router.push("/screens/ReadPogs/ReadPogs");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="text-4xl font-bold mb-8">NOT A SCAM (real)</header>
      <div className="flex flex-wrap justify-center items-center">
        <aside className="w-full p-32 bg-white rounded-lg shadow-md mr-4">
          <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
          <p className="text-lg">
            Username: POGMaster
            <br />
            Trading Level: Expert
            <br />
            Total POGS: 42069
          </p>
          <div className="mt-8">
            <button
              onClick={navigateToCreatePogs}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md mb-4"
            >
              Add POGS
            </button>
            <button
              onClick={navigateToReadPogs}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-3 rounded-lg shadow-md"
            >
              Read POGS
            </button>
          </div>
        </aside>
      </div>
      <div className="flex flex-col items-center space-y-4 mt-10">
        <section className="w-full p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Tips for Trading</h2>
          <ul className="list-disc list-inside text-lg">
            <li>Always research before making a trade.</li>
            <li>Diversify your POG collection.</li>
            <li>Stay updated with the latest POG trends.</li>
          </ul>
        </section>
        <section className="w-full p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">More Tips</h2>
          <ul className="list-disc list-inside text-lg">
            <li>Be patient and wait for the right opportunity.</li>
            <li>Never invest more than you can afford to lose.</li>
            <li>Join the POGS community to learn from others.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default index;
