import React, { useState } from "react"; 
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaPlusSquare,
  FaQuestionCircle,
  FaInfoCircle,
  FaBars,
  FaCar,
  FaGift,
  FaHeart 
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-blue-800 p-2 rounded shadow-lg hover:bg-blue-700 transition duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-blue-800 p-6 text-white transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex md:flex-col`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <FaCar /> Rentals
          </h2>

        <nav className="flex flex-col gap-4">
          <Link
            to="/"
            className={`flex items-center gap-2 px-3 py-2 rounded transition duration-200 
              ${location.pathname === '/' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
          >
            <FaHome /> Home
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 px-3 py-2 rounded transition duration-200 
                ${location.pathname === '/dashboard' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
            >
              <MdDashboard /> Dashboard
            </Link>
          )}

          {user?.role === "user" && (
            <Link
              to="/my-bookings"
              className={`flex items-center gap-2 px-3 py-2 rounded transition duration-200 
                ${location.pathname === '/my-bookings' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
            >
              <FaClipboardList /> My Bookings
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/add-vehicle"
              className={`flex items-center gap-2 px-3 py-2 rounded transition duration-200 
                ${location.pathname === '/add-vehicle' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
            >
              <FaPlusSquare /> Add Vehicle
            </Link>
          )}

          <Link
            to="/offers"
            className={`flex items-center gap-2 px-3 py-2 rounded transition duration-200 
            ${location.pathname === '/offers' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
          >
            <FaGift /> Offers
          </Link>

          {user?.role !== "admin" && (
           <Link
            to="/favorites"
             className={`flex items-center gap-2 px-3 py-2 rounded transition duration-200 
             ${location.pathname === '/favorites' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
           >
           <FaHeart /> My Favorites
           </Link>
        )}


          <Link
            to="/support"
            className={`flex items-center gap-2 px-3 py-2 rounded transition duration-200 
              ${location.pathname === '/support' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
          >
            <FaQuestionCircle /> Support
          </Link>

          <Link
            to="/about"
            className={`flex items-center gap-2 px-3 py-2 rounded transition duration-200 
              ${location.pathname === '/about' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
          >
            <FaInfoCircle /> About
          </Link>
        </nav>
      </div>
    </>
  );
}


