import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import Ewallet from "../../client/pages/screens/Ewallet/Ewallet";
import fetchMock from "jest-fetch-mock";

jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: jest.fn(() => ({ user: { sub: "mock_user_id" } })),
}));

describe("Ewallet Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("updates balance when cashIn is clicked", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ balance: 100 }));
    const { getByText, getByLabelText } = render(<Ewallet />);

    const amountInput = getByLabelText("Amount");
    const cashInButton = getByText("Cash In");

    fireEvent.change(amountInput, { target: { value: "100" } });
    act(() => {
      fireEvent.click(cashInButton);
    });

    await waitFor(() => getByText("Current Balance: ₱ 100"));
    expect(getByText("Current Balance: ₱ 100")).toBeInTheDocument();
  });

  it("updates balance when cashOut is clicked", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ balance: 50 }));
    const { getByText, getByLabelText } = render(<Ewallet />);

    const amountInput = getByLabelText("Amount");
    const cashOutButton = getByText("Cash Out");

    fireEvent.change(amountInput, { target: { value: "50" } });
    act(() => {
      fireEvent.click(cashOutButton);
    });

    await waitFor(() => getByText("Current Balance: ₱ 50"));
    expect(getByText("Current Balance: ₱ 50")).toBeInTheDocument();
  });

  it("calls API to fetch wallet balance on mount", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ balance: 0 }));
    render(<Ewallet />);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
