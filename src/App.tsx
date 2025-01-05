import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardLayout from "./dashboard/dashboardLayout";
import LoadingSpinner from "./components/loader/loadingSpinner";
import TransactionHistory from "./dashboard/Transaction/transaction";

// Lazy load components
const UserOverview = lazy(
  () => import("./dashboard/userOverview/userOverview")
);
const LoanManagement = lazy(
  () => import("./dashboard/loanManagement/loanManagement")
);
const queryClient = new QueryClient(); // Create a QueryClient instance

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route
              path="/"
              element={
                <DashboardLayout>
                  <UserOverview />
                </DashboardLayout>
              }
            />
            <Route
              path="/loan"
              element={
                <DashboardLayout>
                  <LoanManagement />
                </DashboardLayout>
              }
            />
            <Route
              path="/transaction"
              element={
                <DashboardLayout>
                  <TransactionHistory />
                </DashboardLayout>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

// import React, { Suspense, lazy } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import DashboardLayout from "./dashboard/dashboardLayout";
// import LoadingSpinner from "./components/loader/loadingSpinner";

// // Lazy load components
// const UserOverview = lazy(
//   () => import("./dashboard/userOverview/userOverview")
// );
// // const LoanManagement = lazy(() => import("./components/LoanManagement"));
// // const TransactionHistory = lazy(() => import("./components/TransactionHistory"));

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Suspense fallback={<LoadingSpinner />}>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <DashboardLayout>
//                 <UserOverview />
//               </DashboardLayout>
//             }
//           />
//           {/* <Route path="/loan" element={<DashboardLayout><LoanManagement /></DashboardLayout>} />
//           <Route path="/transaction" element={<DashboardLayout><TransactionHistory /></DashboardLayout>} /> */}
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// };

// export default App;
