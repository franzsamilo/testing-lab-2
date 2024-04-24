import React, { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Pog from "../Components&Constants/Pog";

function Assets() {
  const [ownedPogs, setOwnedPogs] = useState([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const { user } = useUser();

  function handleQuantityChange(pogs_id: number, quantity: number) {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [pogs_id]: quantity,
    }));
  }

  async function handleSell(pogs_id: number, stock: number) {
    try {
      const response = await fetch("http://localhost:6969/api/pogs/sell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user?.sub,
          pogs_id: pogs_id,
          stock: stock,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error("Failed to sell pogs");
      }

      const data = await response.json();
      alert(data.message);
      fetch(`http://localhost:6969/api/assets/read/${user?.sub}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch pogs");
          }
          return response.json();
        })
        .then((data) => {
          setOwnedPogs(data);
        })
        .catch((error) => {
          console.error("Error fetching pogs:", error);
        });
    } catch (error) {
      console.error(error);
      alert("Failed to sell pogs");
    }
  }

  useEffect(() => {
    fetch(`http://localhost:6969/api/assets/read/${user?.sub}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch pogs");
        }
        return response.json();
      })
      .then((data) => {
        setOwnedPogs(data);
      })
      .catch((error) => {
        console.error("Error fetching pogs:", error);
      });
  }, [user]);

  return (
    <div>
      <p className="text-cyan-600 italic text-3xl mx-3 my-3 font-medium">
        Current Assets:
      </p>
      <div className="items-center justify-center py-4 px-4 rounded-xl shadow-2xl ml-3 grid gap-4 grid-cols-5 border-t-4 border-cyan-600">
        {ownedPogs.map((pog: Pog) => {
          const priceDiff = pog.price * (pog.price_change / 100);
          const displayPrice = priceDiff + pog.price;
          const borderColor =
            displayPrice > pog.price ? "border-green-600" : "border-red-600";
          const changeColor =
            displayPrice > pog.price ? "text-green-600" : "text-red-600";

          return (
            <div
              key={pog.pogs_id}
              className={`max-w-sm overflow-hidden shadow-lg m-4 items-center justify-center rounded-md border-t-4 ${borderColor}`}
            >
              <div className="px-6 py-4">
                <div className="text-slate-500 font-bold text-xl mb-2 italic">
                  {pog.pogs_name}
                </div>
                <p className="text-blue-300 text-lg mb-2 font-extrabold">
                  {pog.ticker_symbol}
                </p>
                <p className="text-cyan-600 text-base font-medium">
                  Owned Stock: {pog.stock}
                </p>
                <p className="text-cyan-600 text-base font-medium">
                  Per stock: ₱ {displayPrice.toFixed(2)}
                </p>
                <p className={` text-base font-medium ${changeColor}`}>
                  Total Value: ₱ {((pog.stock || 1) * displayPrice).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  min="1"
                  value={quantities[pog.pogs_id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(pog.pogs_id, parseInt(e.target.value))
                  }
                  className="border-2 border-gray-300 bg-white h-10 w-16 rounded-lg text-sm focus:outline-none mb-3 ml-3 text-center"
                />
                <button
                  onClick={() =>
                    handleSell(pog.pogs_id, quantities[pog.pogs_id] || 1)
                  }
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md mb-3 mr-3  "
                >
                  Sell
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Assets;
