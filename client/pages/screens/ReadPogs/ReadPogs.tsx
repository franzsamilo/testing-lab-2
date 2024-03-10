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
  const [editingPog, setEditingPog] = useState<Pog | null>(null);
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

  const handleEdit = (pog: Pog) => {
    setEditingPog(pog);
  };

  const handleSave = async (updatedPog: Pog) => {
    try {
      const response = await fetch(
        `http://localhost:6969/api/pogs/update/${updatedPog.pogs_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPog),
        }
      );

      if (!response.ok) {
        console.error(`Failed to update pog. Status: ${response.status}`);
        const errorData = await response.json();
        console.error("Error Data:", errorData);
        throw new Error("Failed to update pog");
      }

      const updatedPogFromServer = await response.json();
      console.log("Updated Pog from server:", updatedPogFromServer);

      setPogs((oldPogs) =>
        oldPogs.map((pog) =>
          pog.pogs_id === updatedPog.pogs_id ? updatedPogFromServer : pog
        )
      );
      setEditingPog(null);
    } catch (error) {
      console.error("Error updating pog:", error);
    }
  };

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

      setPogs((oldPogs) => oldPogs.filter((pog) => pog.pogs_id !== id));
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
              key={pog.pogs_id}
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
              className={hoveredRow === index ? "hover:bg-gray-200" : ""}
            >
              {editingPog && editingPog.pogs_id === pog.pogs_id ? (
                <>
                  <td className="border px-4 py-2">
                    <input type="text" defaultValue={pog.pogs_name} />
                  </td>
                  <td className="border px-4 py-2">
                    <input type="text" defaultValue={pog.ticker_symbol} />
                  </td>
                  <td className="border px-4 py-2">
                    <input type="number" defaultValue={pog.price} />
                  </td>
                  <td className="border px-4 py-2">
                    <input type="text" defaultValue={pog.color} />
                  </td>
                  <td className="border px-4 py-2">
                    <input type="number" defaultValue={pog.user_id} />
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-green-700 rounded px-4"
                      onClick={() => handleSave({ ...pog, pogs_name: "" })}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-700 rounded px-2"
                      onClick={() => setEditingPog(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border px-4 py-2">{pog.pogs_name}</td>
                  <td className="border px-4 py-2">{pog.ticker_symbol}</td>
                  <td className="border px-4 py-2">{pog.price}</td>
                  <td className="border px-4 py-2">{pog.color}</td>
                  <td className="border px-4 py-2">{pog.user_id}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-green-700 rounded px-4"
                      onClick={() => handleEdit(pog)}
                    >
                      Edit
                    </button>
                    <div></div>
                    <button
                      className="bg-red-700 rounded px-2"
                      onClick={() => handleDelete(pog.pogs_id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReadPogs;
