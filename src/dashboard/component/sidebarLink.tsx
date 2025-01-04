import React from "react";
import { Link, useLocation } from "react-router-dom";
// import { FaChartBar, FaMoneyCheckAlt, FaHistory } from "react-icons/fa";

interface SidebarLinkProps {
  to: string;
  icon: JSX.Element;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li className="mb-4">
      <Link
        to={to}
        className={`flex items-center p-2 rounded-md text-white hover:bg-blue-700 ${
          isActive ? "bg-blue-700" : ""
        }`}
      >
        {icon}
        <span className="ml-2">{label}</span>
      </Link>
    </li>
  );
};

export default SidebarLink;
