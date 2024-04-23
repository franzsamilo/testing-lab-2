import React from "react";
import Pog from "../Components&Constants/Pog";

interface PogsDisplayInterface {
  allPogs: Pog[];
  handleBuy: (pogs_id: number) => void;
}

function PogsDisplay(PogsDisplayProps: PogsDisplayInterface) {
  const { allPogs, handleBuy } = PogsDisplayProps;

  return (
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
              <p className={`text-gray-700 text-base font-medium ${textColor}`}>
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
  );
}

export default PogsDisplay;
