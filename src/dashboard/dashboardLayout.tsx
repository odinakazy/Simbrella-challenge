import React, { ReactNode, useState } from "react";
import SidebarLink from "../dashboard/component/sidebarLink"; // Import SidebarLink for reusability
import {
  FaBars,
  FaChartBar,
  FaMoneyCheckAlt,
  FaHistory,
  FaTimes,
  FaCog,
} from "react-icons/fa";
import { cn } from "../lib/utils";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Hamburger Menu for Mobile */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white focus:outline-none"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 min-h-screen w-64 bg-blue-600 p-6 text-white transition-transform transform sm:static sm:translate-x-0 z-40",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <h1 className="text-2xl font-bold mb-8 mt-6">SIMBRELLA</h1>
        <ul>
          <SidebarLink to="/" icon={<FaChartBar />} label="Overview" />
          <SidebarLink to="/loan" icon={<FaMoneyCheckAlt />} label="Loans" />
          <SidebarLink
            to="/transaction"
            icon={<FaHistory />}
            label="Transactions"
          />
          <SidebarLink to="/settings" icon={<FaCog />} label="Settings" />
        </ul>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0  sm:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto ">{children}</div>
    </div>
  );
};

export default DashboardLayout;
