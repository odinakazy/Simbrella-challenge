import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TransactionHistory from "../src/dashboard/Transaction/transaction";
import "@testing-library/jest-dom";

// Mock data for testing
const mockData = [
  {
    id: "1",
    date: "2023-12-31",
    type: "credit",
    amount: 100,
    description: "Salary",
  },
  {
    id: "2",
    date: "2023-11-30",
    type: "debit",
    amount: -50,
    description: "Groceries",
  },
];

// Mock API
jest.mock("@/apis/services/userOverveiw/getUserDetails", () => ({
  fetchUserData: jest.fn(() => Promise.resolve(mockData)),
}));

const queryClient = new QueryClient();

describe("TransactionHistory Component", () => {
  it("renders the component with transactions", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TransactionHistory />
      </QueryClientProvider>
    );

    // Wait for the "Transaction History" heading to appear
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /transaction history/i })
      ).toBeInTheDocument()
    );
  });
});
