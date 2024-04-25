import { render, screen, waitFor } from "@testing-library/react";
import UpdatePogs from "../../client/pages/screens/UpdatePogs/UpdatePogs";
import fetchMock from "jest-fetch-mock";

describe("UpdatePogs Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("fetches pogs and displays them", async () => {
    const mockPogs = [
      {
        pogs_id: 1,
        pogs_name: "Alpha",
        ticker_symbol: "A",
        price: 100,
        color: "blue",
        price_change: 5,
      },
      {
        pogs_id: 2,
        pogs_name: "Beta",
        ticker_symbol: "B",
        price: 150,
        color: "red",
        price_change: -3,
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockPogs));

    render(<UpdatePogs />);

    await waitFor(() => {
      expect(screen.getByText("Alpha")).toBeInTheDocument();
      expect(screen.getByText("Beta")).toBeInTheDocument();
    });
  });

  it("handles fetch error", async () => {
    fetchMock.mockReject(() => Promise.reject("API is down"));

    render(<UpdatePogs />);

    await waitFor(() => {
      expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
    });
  });
});
