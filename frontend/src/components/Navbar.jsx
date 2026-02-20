import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import ChangePasswordModal from "./ChangePasswordModal.jsx";

function Navbar({ setToken, user }) {
  const [open, setOpen] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="bg-[#1e293b] border-b border-gray-700 px-6 py-4 flex justify-between items-center relative">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold">Secure Cloud IAM</h1>

        {user?.role === "admin" && (
          <span className="text-xs bg-purple-600 px-2 py-1 rounded-full">
            ADMIN
          </span>
        )}
      </div>

      {/* Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          {user?.email}
          <HiChevronDown />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-56 bg-[#0f172a] border border-gray-700 rounded-lg shadow-lg z-50">
            <div className="px-4 py-3 border-b border-gray-700">
              <p className="text-sm text-gray-400">Signed in as</p>
              <p className="text-sm font-medium break-all">{user?.email}</p>
            </div>

            <button
              onClick={() => {
                setShowChangePassword(true);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm"
            >
              Change Password
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                setToken(null);
              }}
              className="w-full text-left px-4 py-2 hover:bg-red-700 text-sm text-red-400"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      
      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  );
}

export default Navbar;
