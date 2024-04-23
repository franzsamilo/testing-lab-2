import React, { useEffect, useState } from "react";
import Pog from "../../screens/Components&Constants/Pog";

function UpdatePogs() {
  const [pogs, setPogs] = useState<Pog[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPog, setEditingPog] = useState<Pog | null>(null);

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

  async function handleDelete(pogId: number) {
    console.log("handleDelete called for Pog ID:", pogId);
    try {
      const response = await fetch(
        `http://localhost:6969/api/pogs/delete/${pogId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete Pog");
      }
      setPogs(pogs.filter((pog) => pog.pogs_id !== pogId));
    } catch (error) {
      console.error("Error deleting Pog:", error);
    }
  }

  async function handleUpdate() {
    if (editingPog) {
      try {
        const response = await fetch(
          `http://localhost:6969/api/pogs/update/${editingPog.pogs_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editingPog),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update Pog");
        }
        setPogs(
          pogs.map((pog) =>
            pog.pogs_id === editingPog.pogs_id ? editingPog : pog
          )
        );
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error updating Pog:", error);
      }
    }
  }

  function generatePriceChange(pogs_id: number) {
    fetch(`http://localhost:6969/api/pogs/generate-price-change/${pogs_id}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Price change generated and recorded:", data.price_change);
      })
      .catch((error) => {
        console.error("Error generating and recording price change:", error);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Pogs on Market</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Pogs Name</th>
            <th className="px-4 py-2">Ticker Symbol</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Color</th>
            <th className="px-4 py-2">Price Change</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pogs.map((pog) => (
            <tr key={pog.pogs_id}>
              <td className="border px-4 py-2">{pog.pogs_id}</td>
              <td className="border px-4 py-2">{pog.pogs_name}</td>
              <td className="border px-4 py-2">{pog.ticker_symbol}</td>
              <td className="border px-4 py-2">{pog.price}</td>
              <td className="border px-4 py-2">{pog.color}</td>
              <td
                className="border px-4 py-2"
                style={{ color: pog.price_change < 0 ? "red" : "green" }}
              >
                {pog.price_change !== null
                  ? `${pog.price_change.toFixed(2)}%`
                  : "Not defined"}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => {
                    setEditingPog(pog);
                    setIsModalOpen(true);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pog.pogs_id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => generatePriceChange(pog.pogs_id)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                >
                  Generate Price Change
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Edit Pog
                </h3>
                <div className="mt-5">
                  <form onSubmit={handleUpdate}>
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                      <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div className="grid grid-cols-3 gap-6">
                          <div className="col-span-3 sm:col-span-2">
                            <label
                              htmlFor="edit-pogs_name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Pogs Name
                            </label>
                            <input
                              type="text"
                              name="pogs_name"
                              id="edit-pogs_name"
                              value={editingPog?.pogs_name}
                              onChange={(e) => {
                                if (editingPog) {
                                  setEditingPog({
                                    ...editingPog,
                                    pogs_name: e.target.value,
                                  });
                                }
                              }}
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div className="col-span-3 sm:col-span-2">
                            <label
                              htmlFor="edit-ticker_symbol"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Ticker Symbol
                            </label>
                            <input
                              type="text"
                              name="pogs_name"
                              id="edit-ticker_symbol"
                              value={editingPog?.ticker_symbol}
                              onChange={(e) => {
                                if (editingPog) {
                                  setEditingPog({
                                    ...editingPog,
                                    ticker_symbol: e.target.value,
                                  });
                                }
                              }}
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div className="col-span-3 sm:col-span-2">
                            <label
                              htmlFor="edit-price"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Price
                            </label>
                            <input
                              type="number"
                              name="price"
                              id="edit-price"
                              value={editingPog?.price || 0}
                              onChange={(e) => {
                                if (editingPog) {
                                  const price = parseFloat(e.target.value);
                                  setEditingPog({
                                    ...editingPog,
                                    price: isNaN(price) ? 0 : price,
                                  });
                                }
                              }}
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div className="col-span-3 sm:col-span-2">
                            <label
                              htmlFor="edit-color"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Color
                            </label>
                            <input
                              type="text"
                              name="color"
                              id="edit-color"
                              value={editingPog?.color}
                              onChange={(e) => {
                                if (editingPog) {
                                  setEditingPog({
                                    ...editingPog,
                                    color: e.target.value,
                                  });
                                }
                              }}
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePogs;
