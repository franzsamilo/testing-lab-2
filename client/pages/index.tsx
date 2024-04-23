/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import useNavigation from "./screens/Components&Constants/Navigation";
import Pog from "./screens/Components&Constants/Pog";
import CarouselSlider from "./screens/Components&Constants/Carousel";

function index() {
  const { user, error, isLoading } = useUser();
  const [allPogs, setAllPogs] = useState<Pog[]>([]);
  const [randomPogs, setRandomPogs] = useState<Pog[]>([]);
  const {
    auth0LogIn,
    auth0LogOut,
    navigateToCreatePogs,
    navigateToUpdatePogs,
    navigateToEwallet,
    navigateToAssets,
  } = useNavigation();

  useEffect(() => {
    fetch("http://localhost:6969/api/pogs/read")
      .then((response) => response.json())
      .then((data) => {
        setAllPogs(data);
        const selectedPogs = getRandomPogs(data, 8);
        setRandomPogs(selectedPogs);
      })
      .catch((error) => console.error("Error fetching pogs:", error));
  }, []);

  function getRandomPogs(pogs: Pog[], limit: number): Pog[] {
    const shuffledPogs = pogs.sort(() => 0.5 - Math.random());
    return shuffledPogs.slice(0, limit);
  }

  function handleBuy(pogs_id: number) {}

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-white mb-[420px]">
        <Marquee
          speed={30}
          gradient={false}
          className="text-2xl font-bold text-blue-500"
        >
          {randomPogs.map((pog: Pog, index) => {
            const displayPercentageChange = pog.price_change
              ? pog.price_change.toFixed(2)
              : "N/A";

            const changeColor =
              pog.price_change > 0 ? "text-green-600" : "text-red-600";

            return (
              <div key={index} className="mr-5 inline-block">
                <div
                  className={`max-w-sm overflow-hidden shadow-lg m-4 items-center justify-center rounded-md border-t-4 ${changeColor}`}
                >
                  <div className="px-3 py-2 flex flex-row ">
                    <p className={` text-lg font-extrabold ${changeColor}`}>
                      {pog.ticker_symbol}
                    </p>
                    <p className={`ml-2 text-lg font-medium ${changeColor}`}>
                      {pog.price_change > 0 ? "↑ " : "↓ "}
                      {displayPercentageChange}%
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Marquee>
        <CarouselSlider />
        <div className="items-center justify-center left-0 absolute mt-[500px] py-4 px-4 rounded-xl shadow-2xl ml-3 grid gap-4 grid-cols-3">
          {allPogs.map((pog: Pog) => {
            const displayPrice = pog.price + (pog.price_change || 0);
            const borderColor =
              displayPrice > pog.price ? "border-green-600" : "border-red-600";
            const textColor =
              displayPrice > pog.price ? "text-green-600" : "text-red-600";

            return (
              <div
                key={pog.pogs_id}
                // className={`max-w-sm overflow-hidden shadow-lg m-4 items-center justify-center rounded-md border-t-4 ${borderColor}`}
                className="max-w-sm overflow-hidden shadow-lg m-4 items-center justify-center rounded-md border-t-4 border-cyan-600"
              >
                <div className="px-6 py-4">
                  <div className="text-slate-500 font-bold text-xl mb-2 italic">
                    {pog.pogs_name}
                  </div>
                  <p className="text-blue-300 text-lg mb-2 font-extrabold">
                    {pog.ticker_symbol}
                  </p>
                  <p
                    className={`text-gray-700 text-base font-medium ${textColor}`}
                  >
                    Price: ₱{displayPrice.toFixed(2)}
                    {displayPrice > pog.price ? " ↑" : " ↓"}
                  </p>
                </div>
                <div className="px-6 py-4">
                  <button
                    onClick={() => handleBuy(pog.pogs_id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                  >
                    Buy
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="py-16 px-16 right-0 rounded-lg flex flex-col items-center mt-32 shadow-lg mr-4 fixed border-t-4 border-l-4 border-green-700 ">
          <Image
            src={user?.picture || ""}
            alt={user?.name || ""}
            width={64}
            height={64}
            className="rounded-lg mb-2"
          />
          <p className=" text-lg font-bold italic text-slate-400 my-4">
            {user.name}
          </p>
          <p className=" text-sm font-medium italic text-green-400 my-4">
            User Actions
          </p>
          <button
            onClick={navigateToEwallet}
            className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md mb-4"
          >
            My Wallet
          </button>
          <button
            onClick={navigateToAssets}
            className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
          >
            My Assets
          </button>
          <p className=" text-sm font-medium italic text-red-400 my-4">
            Admin Actions
          </p>
          <button
            onClick={navigateToCreatePogs}
            className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md mb-4"
          >
            Create Pog
          </button>
          <button
            onClick={navigateToUpdatePogs}
            className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
          >
            Update Pogs
          </button>
          <button
            onClick={auth0LogOut}
            className="bg-red-500 hover:bg-white text-white hover:text-red-500 font-bold py-2 px-4 rounded-lg shadow-md mt-8"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onClick={auth0LogIn}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
      >
        Login
      </button>
    </div>
  );
}

export default index;
