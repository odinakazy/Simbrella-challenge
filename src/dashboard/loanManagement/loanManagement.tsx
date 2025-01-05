import { Card } from "../../components/ui/card";
import LoanHistory from "./component/loanHistory";

import RequestLoan from "./component/requestLoan";

// Dummy data (can be replaced with actual API data)
const loans = [
  {
    id: 1,
    loanId: 456,
    amount: 1200,
    tenure: 12,
    purpose: "Home Renovation",
    startDate: "2024-03-01",
    repaymentDate: "2025-03-01",
    status: "active",
    interestRate: 5.0,
    disbursementDate: "2024-03-01",
    closureDate: "2025-03-01",
    repaymentStatus: "Partially Paid",
  },
  {
    id: 2,
    amount: 1500,
    loanId: 453,
    tenure: 24,
    purpose: "Education",
    startDate: "2021-08-01",
    repaymentDate: "2023-08-01",
    status: "completed",
    interestRate: 4.5,
    disbursementDate: "2021-08-01",
    closureDate: "2023-08-01",
    repaymentStatus: "Fully Paid",
  },
  {
    id: 3,
    amount: 800,
    tenure: 6,
    loanId: 450,
    purpose: "Car Purchase",
    startDate: "2022-03-15",
    repaymentDate: "2022-09-15",
    status: "completed",
    interestRate: 3.8,
    disbursementDate: "2022-03-15",
    closureDate: "2022-09-15",
    repaymentStatus: "Fully Paid",
  },
];

//
const LoanManagement: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Loan Management
      </h1>

      {/* Active Loan Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold">Active Loan</h2>
        <Card className="bg-green-100 p-4 rounded-lg shadow-md">
          {loans.some((loan) => loan.status === "active") ? (
            <div className="text-center text-lg font-semibold text-green-700">
              Active Loan: $
              {loans.find((loan) => loan.status === "active")?.amount}
            </div>
          ) : (
            <div>No active loan.</div>
          )}
        </Card>
      </div>
      {/* Loan history */}
      <LoanHistory />

      {/* Request loan */}
      <RequestLoan />
    </div>
  );
};

export default LoanManagement;
