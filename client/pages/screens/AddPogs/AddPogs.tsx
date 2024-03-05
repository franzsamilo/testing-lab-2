import React, { useState } from "react";

function AddPogs() {
  const [PogsName, setPogsName] = useState("");
  const [TickerSymbol, setTickerSymbol] = useState("");
  const [Price, setPrice] = useState(0);
  const [Color, setColor] = useState("");
  const [UserId, setUserId] = useState(0);

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
        user_id: UserId,
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
    <div>
      <div className="flex flex-col">
        <input
          type="text"
          value={PogsName}
          onChange={(e) => setPogsName(e.target.value)}
          className="border-2 border-black mx-40 mt-8"
          placeholder="ex. Pure Storage"
        />
        <input
          type="text"
          value={TickerSymbol}
          onChange={(e) => setTickerSymbol(e.target.value)}
          className="border-2 border-black mx-40 mt-8"
          placeholder="ex. PSTG"
        />
        <input
          type="number"
          value={Price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border-2 border-black mx-40 mt-8"
          placeholder="Price"
        />
        <input
          type="text"
          value={Color}
          onChange={(e) => setColor(e.target.value)}
          className="border-2 border-black mx-40 mt-8"
          placeholder="ex. #000000"
        />
        <input
          type="number"
          value={0}
          onChange={(e) => setUserId(Number(e.target.value))}
          className="border-2 border-black mx-40 mt-8"
          placeholder="default 0"
        />

        <button onClick={addPogsQuery}>Add Pogs</button>
      </div>
    </div>
  );
}

export default AddPogs;
