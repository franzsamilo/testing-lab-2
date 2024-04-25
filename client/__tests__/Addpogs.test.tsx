import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import AddPogs from "../../client/pages/screens/AddPogs/AddPogs";
import fetchMock from "jest-fetch-mock";

jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: jest.fn(() => ({ user: { sub: "mock_user_id" } })),
}));

describe("AddPogs Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should render input fields and button", () => {
    const { getByLabelText, getAllByText } = render(<AddPogs />);

    expect(getByLabelText("Pogs Name")).toBeInTheDocument();
    expect(getByLabelText("Ticker Symbol")).toBeInTheDocument();
    expect(getByLabelText("Price")).toBeInTheDocument();
    expect(getByLabelText("Color")).toBeInTheDocument();
    const addPogsButtons = getAllByText("Add Pogs");
    expect(addPogsButtons[1]).toBeInTheDocument();
  });

  it("should submit form data and handle successful response", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    const { getByLabelText, getAllByText } = render(<AddPogs />);

    const pogsNameInput = getByLabelText("Pogs Name");
    const tickerSymbolInput = getByLabelText("Ticker Symbol");
    const priceInput = getByLabelText("Price");
    const colorInput = getByLabelText("Color");
    const addPogsButtons = getAllByText("Add Pogs");
    const addPogsButton = addPogsButtons[1];

    fireEvent.change(pogsNameInput, { target: { value: "Test Pogs" } });
    fireEvent.change(tickerSymbolInput, { target: { value: "TST" } });
    fireEvent.change(priceInput, { target: { value: "100" } });
    fireEvent.change(colorInput, { target: { value: "#000000" } });

    act(() => {
      fireEvent.click(addPogsButton);
    });

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:6969/api/pogs/create",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pogs_name: "Test Pogs",
          ticker_symbol: "TST",
          price: 100,
          color: "#000000",
          user_id: "mock_user_id",
        }),
      })
    );
  });

  it("should handle fetch error", async () => {
    fetchMock.mockReject(new Error("API is down"));
    const { getByLabelText, getAllByText } = render(<AddPogs />);
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    const pogsNameInput = getByLabelText("Pogs Name");
    const tickerSymbolInput = getByLabelText("Ticker Symbol");
    const priceInput = getByLabelText("Price");
    const colorInput = getByLabelText("Color");
    const addPogsButtons = getAllByText("Add Pogs");
    const addPogsButton = addPogsButtons[1];

    fireEvent.change(pogsNameInput, { target: { value: "Test Pogs" } });
    fireEvent.change(tickerSymbolInput, { target: { value: "TST" } });
    fireEvent.change(priceInput, { target: { value: "100" } });
    fireEvent.change(colorInput, { target: { value: "#000000" } });

    act(() => {
      fireEvent.click(addPogsButton);
    });

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error adding task:",
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});
