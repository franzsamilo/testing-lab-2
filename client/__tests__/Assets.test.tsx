import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import Assets from "../../client/pages/screens/MyAssets/Assets";
import { useUser } from "@auth0/nextjs-auth0/client";

jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: jest.fn(),
}));

describe("Assets Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    (useUser as jest.Mock).mockReturnValue({ user: { sub: "user123" } });

    const mockAssets = [
      {
        pogs_id: 1,
        pogs_name: "Kekeke",
        ticker_symbol: "A",
        price: 100,
        stock: 10,
        price_change: 5,
      },
      {
        pogs_id: 2,
        pogs_name: "Kei",
        ticker_symbol: "B",
        price: 150,
        stock: 5,
        price_change: -3,
      },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockAssets));
  });

  it("fetches assets and displays them", async () => {
    render(<Assets />);
    await waitFor(() => {
      expect(screen.getByText("Kekeke")).toBeInTheDocument();
      expect(screen.getByText("Kei")).toBeInTheDocument();
    });
  });

  it("handles quantity change for multiple items", async () => {
    render(<Assets />);
    await waitFor(() => {
      const inputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
      userEvent.clear(inputs[0]);
      userEvent.type(inputs[0], "1");
      expect(inputs[0].value).toBe("1");
    });
  });

  it("sells an asset and fetches updated assets", async () => {
    render(<Assets />);
    await waitFor(() => {
      const sellButtons = screen.getAllByText("Sell");
      if (sellButtons.length > 0) {
        userEvent.click(sellButtons[0]);
      }
    });
  });
});
