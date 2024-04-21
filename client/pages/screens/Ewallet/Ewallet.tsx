import React, { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

function Ewallet() {
  const { user } = useUser();
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:6969/api/wallet/read/${user.sub}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch wallet balance");
          }
          return response.json();
        })
        .then((data) => {
          setBalance(data.balance);
        })
        .catch((error) => {
          console.error("Error fetching wallet balance:", error);
        });
    }
  }, [user]);

  function cashIn() {
    fetch("http://localhost:6969/api/wallet/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user?.sub,
        amount: amount,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add funds");
        }
        return response.json();
      })
      .then((data) => {
        alert("Funds added successfully");
      })
      .catch((error) => {
        console.error("Error adding funds:", error);
      });
  }

  function cashOut() {
    fetch("http://localhost:6969/api/wallet/minus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user?.sub,
        amount: amount,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to subtract funds");
        }
        return response.json();
      })
      .then((data) => {
        alert("Funds subtracted successfully");
      })
      .catch((error) => {
        console.error("Error subtracting funds:", error);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">E-Wallet</h1>
      <div className="my-8 text-xl font-semibold">
        Current Balance: {balance}
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Amount"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={cashIn}
          >
            Cash In
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
            type="button"
            onClick={cashOut}
          >
            Cash Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ewallet;
