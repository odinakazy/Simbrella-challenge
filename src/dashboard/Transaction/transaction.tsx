/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../apis/Types";
import { fetchUserData } from "@/apis/services/userOverveiw/getUserDetails";
import TransactionSkeleton from "@/components/loader/transactionSkeletonLoader";
import { FaSortUp, FaSortDown } from "react-icons/fa";

const TransactionHistory = () => {
  const { data, isLoading } = useQuery<User[]>({
    queryKey: ["user"],
    queryFn: fetchUserData,
  });

  const [filterType, setFilterType] = useState("all");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  if (isLoading) {
    return <TransactionSkeleton />;
  }

  // Filter transactions by type
  const filteredTransactions =
    filterType === "all"
      ? data?.[0]?.recentTransactions || []
      : data?.[0]?.recentTransactions.filter(
          (txn) => txn.type.toLowerCase() === filterType
        ) || [];

  // Sort transactions by selected field and order
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortField) return 0;

    let valueA: any;
    let valueB: any;

    if (sortField === "date") {
      valueA = new Date(a.date).getTime();
      valueB = new Date(b.date).getTime();
    } else if (sortField === "amount") {
      valueA = Math.abs(a.amount);
      valueB = Math.abs(b.amount);
    } else if (sortField === "type") {
      valueA = a.type;
      valueB = b.type;
    }

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Handle sorting logic
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-xl">
      <h2 className="text-3xl font-extrabold mb-8 text-blue-900 text-center">
        Transaction History
      </h2>

      <div className="mb-8 flex justify-left">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Transactions</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600">
              <th
                className="p-4 text-left font-semibold text-white cursor-pointer hover:bg-blue-300"
                onClick={() => handleSort("date")}
              >
                Date
                {sortField === "date" &&
                  (sortOrder === "asc" ? (
                    <FaSortUp className="inline ml-2 mt-1" />
                  ) : (
                    <FaSortDown className="inline ml-2 mb-2" />
                  ))}
              </th>
              <th
                className="p-4 text-left font-semibold text-white cursor-pointer hover:bg-blue-300"
                onClick={() => handleSort("type")}
              >
                Type
                {sortField === "type" &&
                  (sortOrder === "asc" ? (
                    <FaSortUp className="inline ml-2 mt-1" />
                  ) : (
                    <FaSortDown className="inline ml-2 mb-2" />
                  ))}
              </th>
              <th
                className="p-4 text-left font-semibold text-white cursor-pointer hover:bg-blue-300"
                onClick={() => handleSort("amount")}
              >
                Amount
                {sortField === "amount" &&
                  (sortOrder === "asc" ? (
                    <FaSortUp className="inline ml-2 mt-1" />
                  ) : (
                    <FaSortDown className="inline ml-2 mb-2" />
                  ))}
              </th>
              <th className="p-4 text-left font-semibold text-white">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((txn, index) => (
              <tr
                key={txn.id}
                className={`border-t ${
                  index % 2 === 0 ? "bg-blue-50" : "bg-white"
                } hover:bg-blue-100`}
              >
                <td className="p-4 text-gray-700">
                  {new Date(txn.date).toLocaleDateString()}
                </td>
                <td className="p-4 text-gray-700 capitalize">{txn.type}</td>
                <td
                  className={`px-4 py-2 text-left ${
                    txn.amount < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {txn.amount < 0 ? "-" : "+"}${Math.abs(txn.amount).toFixed(2)}
                </td>
                <td className="p-4 text-gray-700">{txn.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
