import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import useNavigation from "../Components&Constants/Navigation";
import { adminEmails } from "@/pages/admins";
function UserSidebar() {
  const {
    auth0LogOut,
    navigateToCreatePogs,
    navigateToUpdatePogs,
    navigateToEwallet,
    navigateToAssets,
  } = useNavigation();
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && user.email && adminEmails.includes(user.email)) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return (
    <div className="py-16 px-16 right-0 rounded-lg flex flex-col items-center mt-32 shadow-lg mr-4 fixed border-t-4 border-l-4 border-green-700 ">
      <Image
        src={user?.picture || ""}
        alt={user?.name || ""}
        width={64}
        height={64}
        className="rounded-lg mb-2"
      />
      <p className=" text-lg font-bold italic text-slate-400 mt-4">
        {user?.name}
      </p>
      {!isAdmin ? (
        <div className="flex flex-col items-center">
          <p className=" text-sm font-medium italic text-green-400 mb-4">
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
        </div>
      ) : (
        <div className="flex flex-col items-center">
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
        </div>
      )}

      <button
        onClick={auth0LogOut}
        className="bg-red-500 hover:bg-white text-white hover:text-red-500 font-bold py-2 px-4 rounded-lg shadow-md mt-8"
      >
        Logout
      </button>
    </div>
  );
}

export default UserSidebar;
