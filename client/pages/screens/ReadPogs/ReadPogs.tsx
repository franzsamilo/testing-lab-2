import React, { useEffect, useState } from "react";

interface Pog {
  pogs_name: string;
  ticker_symbol: string;
  price: number;
  color: string;
  user_id: number;
  pogs_id: number;
}

function ReadPogs() {
  const [pogs, setPogs] = useState<Pog[]>([]);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:6969/api/pogs/read")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch pogs");
        }
        return response.json();
      })
      .then((data) => {
        setPogs(data);
      })
      .catch((error) => {
        console.error("Error fetching pogs:", error);
      });
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:6969/api/pogs/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete pog");
      }

      // If the deletion is successful, remove the item from the state
      setPogs((oldPogs) => oldPogs.filter((pog) => pog.user_id !== id));
    } catch (error) {
      console.error("Error deleting pog:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Read Pogs</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Pogs Name</th>
            <th className="px-4 py-2">Ticker Symbol</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Color</th>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pogs.map((pog, index) => (
            <tr
              key={index}
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
              className={hoveredRow === index ? "hover:bg-gray-200" : ""}
            >
              <td className="border px-4 py-2">{pog.pogs_name}</td>
              <td className="border px-4 py-2">{pog.ticker_symbol}</td>
              <td className="border px-4 py-2">{pog.price}</td>
              <td className="border px-4 py-2">{pog.color}</td>
              <td className="border px-4 py-2">{pog.user_id}</td>
              {hoveredRow === index && (
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(pog.pogs_id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReadPogs;
