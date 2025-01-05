const TransactionSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-xl">
      <h2 className="text-3xl font-extrabold mb-8 text-blue-900 text-center">
        Transaction History
      </h2>

      {/* Skeleton Filter */}
      <div className="mb-8 flex justify-left">
        <div className="w-full md:w-1/3 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg skeleton-loading" />
      </div>

      {/* Skeleton Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600">
              <th className="p-4 text-left font-semibold text-white">Date</th>
              <th className="p-4 text-left font-semibold text-white">Type</th>
              <th className="p-4 text-left font-semibold text-white">Amount</th>
              <th className="p-4 text-left font-semibold text-white">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr
                key={index}
                className={`border-t ${
                  index % 2 === 0 ? "bg-blue-50" : "bg-white"
                }`}
              >
                <td className="p-4">
                  <div className="w-24 h-4 rounded-md skeleton-loading" />
                </td>
                <td className="p-4">
                  <div className="w-16 h-4 rounded-md skeleton-loading" />
                </td>
                <td className="p-4">
                  <div className="w-20 h-4 rounded-md skeleton-loading" />
                </td>
                <td className="p-4">
                  <div className="w-32 h-4 rounded-md skeleton-loading" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionSkeleton;
