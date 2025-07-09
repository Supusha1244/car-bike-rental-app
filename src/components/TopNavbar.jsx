import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function TopNavbar() {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    setShowDropdown(false);
    navigate("/login"); 
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-blue-100 px-12 py-3 shadow-md border-b border-blue-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-bounce">🚗</span>
          <h1 className="text-2xl font-bold text-blue-800">RideEasy Rentals</h1>
        </div>

        {!user ? (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="flex items-center text-blue-700 font-medium hover:text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition duration-300 shadow-sm"
            >
              <span className="mr-1">🔑</span> Login
            </Link>
            <Link
              to="/register"
              className="flex items-center text-blue-700 font-medium hover:text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition duration-300 shadow-sm"
            >
              <span className="mr-1">📝</span> Register
            </Link>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="flex items-center gap-2 bg-white border border-green-300 px-4 py-2 rounded-lg shadow-sm hover:bg-green-50 transition duration-300"
            >
              <span className="text-green-700 font-medium">
                👤 {user.email.split("@")[0]}
              </span>
              <svg
                className={`w-4 h-4 transform transition duration-300 ${
                  showDropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow w-40 z-10 transition duration-300 ease-in-out transform scale-100">
                <button
                  onClick={handleLogout}
                  className="w-full font-bold px-4 py-2 bg-red-600 text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 active:bg-red-700 rounded-md transition duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}





