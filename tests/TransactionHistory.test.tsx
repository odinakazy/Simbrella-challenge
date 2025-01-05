import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TransactionHistory from "../src/dashboard/Transaction/transaction";
import React from "react";
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

    // Wait for the data to load
    expect(await screen.findByText("Transaction History")).toBeInTheDocument();

    // Check if transactions are displayed
    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.getByText("Groceries")).toBeInTheDocument();
  });

  it("filters transactions by type", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TransactionHistory />
      </QueryClientProvider>
    );

    // Wait for data to load
    await screen.findByText("Transaction History");

    // Change filter to "credit"
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "credit" },
    });

    // Check if only credit transactions are displayed
    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
  });

  it("sorts transactions by date", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TransactionHistory />
      </QueryClientProvider>
    );

    // Wait for data to load
    await screen.findByText("Transaction History");

    // Sort by date
    fireEvent.click(screen.getByText("Date"));

    // Check if sorted correctly
    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("2023-11-30");
    expect(rows[2]).toHaveTextContent("2023-12-31");
  });
});
