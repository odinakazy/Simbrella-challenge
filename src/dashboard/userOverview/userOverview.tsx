import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // ShadCN Card components
import { FaMoneyBillWave, FaClock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
// import { fetchUserData } from "../../apis/services/";
import { User } from "../../apis/Types";
import { fetchUserData } from "@/apis/services/userOverveiw/getUserDetails";
import UserOverviewSkeleton from "@/components/loader/overviewSkeletonLoader";

const UserOverview: React.FC = () => {
  const { data, isLoading, isError } = useQuery<User[]>({
    queryKey: ["user"], // Correctly defined queryKey
    queryFn: fetchUserData, // Fetch function
  });

  console.log(data?.[0]?.recentTransactions);

  // Dynamic greeting based on the current time
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  // State to toggle account balance visibility
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  if (isLoading) {
    return <UserOverviewSkeleton />;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="mt-10 md:mt-2 space-y-6">
      {/* Greeting Card */}
      <Card className="p-2 sm:p-6 shadow-md border border-gray-200 bg-gradient-to-br from-blue-500 to-blue-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {greeting}, {data?.[0]?.name}!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Welcome back to your dashboard.</p>
        </CardContent>
      </Card>

      {/* Account Balance Card */}
      <Card className="p-2 sm:p-6 shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <div className="flex items-center space-x-2">
              <FaMoneyBillWave className="text-xl" />
              <span>Account Balance</span>
            </div>
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setIsBalanceVisible((prev) => !prev)}
            >
              {isBalanceVisible ? (
                <FaEye size={20} />
              ) : (
                <FaEyeSlash size={20} />
              )}
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">
            {isBalanceVisible ? `$${data?.[0]?.accountBalance}` : "****"}
          </p>
        </CardContent>
      </Card>

      {/* Recent Transactions Table */}
      <Card className="p-2 sm:p-6 shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-600">
            <FaClock className="text-xl" />
            <span>Recent Transactions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                  <th className="px-4 py-2 text-center">Transaction Type</th>
                </tr>
              </thead>
              <tbody>
                {data?.[0]?.recentTransactions.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="px-4 py-2 text-gray-700">
                      {transaction.date}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {transaction.description}
                    </td>
                    <td
                      className={`px-4 py-2 text-right ${
                        transaction.amount < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {transaction.amount < 0 ? "-" : "+"}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {transaction?.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserOverview;
