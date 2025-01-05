import React from "react";

const UserOverviewSkeleton: React.FC = () => {
  return (
    <div className="mt-10 md:mt-2 space-y-6 animate-pulse">
      {/* Greeting Card Skeleton */}
      <div className="p-2 sm:p-6 shadow-md border border-gray-200 bg-gradient-to-br from-gray-300 to-gray-400 text-transparent">
        <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
        <div className="mt-2 h-4 w-2/3 bg-gray-300 rounded"></div>
      </div>

      {/* Account Balance Card Skeleton */}
      <div className="p-2 sm:p-6 shadow-md border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
          </div>
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        </div>
        <div className="mt-4 h-8 w-1/2 bg-gray-300 rounded"></div>
      </div>

      {/* Recent Transactions Table Skeleton */}
      <div className="p-2 sm:p-6 shadow-md border border-gray-200">
        <div className="h-4 w-40 bg-gray-300 rounded mb-4"></div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 py-2"
            >
              <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
              <div className="h-4 w-1/6 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOverviewSkeleton;
