import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

function AddPogs() {
  const { user } = useUser();
  const [PogsName, setPogsName] = useState("");
  const [TickerSymbol, setTickerSymbol] = useState("");
  const [Price, setPrice] = useState(0);
  const [Color, setColor] = useState("");

  function addPogsQuery() {
    fetch("http://localhost:6969/api/pogs/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pogs_name: PogsName,
        ticker_symbol: TickerSymbol,
        price: Price,
        color: Color,
        user_id: user?.sub,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add task");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Task created successfully:", data);
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Add Pogs</h1>
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="pogsName"
            >
              Pogs Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="pogsName"
              type="text"
              value={PogsName}
              onChange={(e) => setPogsName(e.target.value)}
              placeholder="ex. Pure Storage"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="tickerSymbol"
            >
              Ticker Symbol
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="tickerSymbol"
              type="text"
              value={TickerSymbol}
              onChange={(e) => setTickerSymbol(e.target.value)}
              placeholder="ex. PSTG"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="price"
              type="number"
              value={Price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Price"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="color"
            >
              Color
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="color"
              type="text"
              value={Color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="ex. #000000"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={addPogsQuery}
            >
              Add Pogs
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPogs;
