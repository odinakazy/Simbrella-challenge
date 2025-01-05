/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AiOutlineEye } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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

const LoanHistory = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  //
  const handleViewDetails = (loan: any) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  // Function to calculate remaining days for an active loan
  const calculateRemainingDays = (repaymentDate: string) => {
    const today = new Date();
    const dueDate = new Date(repaymentDate);

    // Check if the repayment date is in the future
    if (dueDate > today) {
      const remainingTime = dueDate.getTime() - today.getTime();
      const remainingDays = Math.ceil(remainingTime / (1000 * 3600 * 24)); // convert milliseconds to days
      return remainingDays;
    } else {
      return 0; // Return 0 if the repayment date has passed
    }
  };

  // Filter loans based on search term (by amount or purpose)
  const filteredLoans = loans.filter(
    (loan) =>
      loan.amount.toString().includes(searchTerm) ||
      loan.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <h2 className="text-xl font-semibold">Loan History</h2>
      <Card className="mb-8 shadow-lg rounded-lg">
        <CardHeader className="bg-blue-600 text-white p-5 rounded-t-lg">
          {/* <h2 className="text-xl font-semibold">Loan History</h2> */}
          {/* Search Bar */}
          <div className="flex justify-left">
            <Input
              type="text"
              placeholder="Search by Amount or Purpose"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full md:w-96 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Table aria-label="Loan History" className="min-w-full table-auto">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="px-4 py-3 text-left text-gray-700">Purpose</th>
                <th className="px-4 py-3 text-left text-gray-700">Tenure</th>
                <th className="px-4 py-3 text-left text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left text-gray-700">
                  Start Date
                </th>
                <th className="px-4 py-3 text-left text-gray-700">
                  Repayment Date
                </th>
                <th className="px-4 py-3 text-left text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-gray-700">
                  Remaining Days
                </th>
                <th className="px-4 py-3 text-left text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => (
                <tr
                  key={loan.id}
                  className={`${
                    loan.status === "active" ? "bg-green-100" : "bg-white"
                  } border-b border-gray-200`}
                >
                  <td className="px-4 py-3 text-sm">{loan.purpose}</td>
                  <td className="px-4 py-3 text-sm">{loan.tenure} months</td>
                  <td className="px-4 py-3 text-sm">${loan.amount}</td>
                  <td className="px-4 py-3 text-sm">{loan.startDate}</td>
                  <td className="px-4 py-3 text-sm">{loan.repaymentDate}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        loan.status === "active"
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {loan.status === "active"
                      ? calculateRemainingDays(loan.repaymentDate) + " days"
                      : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleViewDetails(loan)}
                    >
                      <AiOutlineEye size={20} style={{ color: "black" }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>

      {/* Loan Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-800 border-b pb-2">
              Loan Details
            </DialogTitle>
          </DialogHeader>
          {selectedLoan && (
            <div className="space-y-4 mt-4">
              <p className="text-gray-700">
                <strong className="text-gray-900">Amount:</strong> $
                {selectedLoan.amount}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Loan-Id:</strong>{" "}
                {selectedLoan.loanId}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Tenure:</strong>{" "}
                {selectedLoan.tenure} months
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Purpose:</strong>{" "}
                {selectedLoan.purpose}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Start Date:</strong>{" "}
                {selectedLoan.startDate}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Repayment Date:</strong>{" "}
                {selectedLoan.repaymentDate}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Status:</strong>{" "}
                {selectedLoan.status}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Interest Rate:</strong>{" "}
                {selectedLoan.interestRate}%
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Repayment Status:</strong>{" "}
                {selectedLoan.repaymentStatus}
              </p>
            </div>
          )}
          <DialogFooter className="mt-6">
            <Button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoanHistory;
