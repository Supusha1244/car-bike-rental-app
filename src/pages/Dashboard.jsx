import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaCarSide,
  FaMoneyBillWave,
  FaClipboardList,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const { user } = useAuth();
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const unsubBookings = onSnapshot(collection(db, "bookings"), (snapshot) => {
      const bookings = snapshot.docs.map((doc) => doc.data());
      setTotalBookings(bookings.length);
      const revenue = bookings.reduce((sum, b) => sum + (b.total || 0), 0);
      setTotalRevenue(revenue);

      const grouped = {};
      bookings.forEach((b) => {
        const date = b.createdAt?.toDate().toISOString().split("T")[0];
        if (date) grouped[date] = (grouped[date] || 0) + 1;
      });

      const data = Object.entries(grouped).map(([date, count]) => ({
        date,
        bookings: count,
      })).sort((a, b) => new Date(a.date) - new Date(b.date));

      setChartData(data);
    });

    const unsubUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      setTotalUsers(snapshot.docs.length);
    });

    const unsubVehicles = onSnapshot(collection(db, "vehicles"), (snapshot) => {
      setTotalVehicles(snapshot.docs.length);
    });

    const bookingsQuery = query(
      collection(db, "bookings"),
      orderBy("createdAt", "desc")
    );
    const unsubRecent = onSnapshot(bookingsQuery, (snapshot) => {
      const recent = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecentBookings(recent.slice(0, 5));
    });

    return () => {
      unsubBookings();
      unsubUsers();
      unsubVehicles();
      unsubRecent();
    };
  }, []);

  const timeAgo = (timestamp) => {
    if (!timestamp?.toDate) return "Just now";
    const now = new Date();
    const diff = now - timestamp.toDate();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day(s) ago`;
    if (hours > 0) return `${hours} hour(s) ago`;
    return `${minutes} minute(s) ago`;
  };

  const statusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "active":
        return "bg-green-100 text-green-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      case "completed":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const statCards = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: <FaClipboardList className="text-blue-500 text-2xl" />,
      bg: "bg-gradient-to-r from-blue-100 to-blue-50",
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: <FaUsers className="text-purple-500 text-2xl" />,
      bg: "bg-gradient-to-r from-purple-100 to-purple-50",
    },
    {
      title: "Total Vehicles",
      value: totalVehicles,
      icon: <FaCarSide className="text-green-500 text-2xl" />,
      bg: "bg-gradient-to-r from-green-100 to-green-50",
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue}`,
      icon: <FaMoneyBillWave className="text-yellow-500 text-2xl" />,
      bg: "bg-gradient-to-r from-yellow-100 to-yellow-50",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, <strong>{user?.email}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-xl shadow-md ${card.bg} flex justify-between items-center`}
          >
            <div>
              <h2 className="text-sm text-gray-500">{card.title}</h2>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
            {card.icon}
          </div>
        ))}
      </div>

      <div className="bg-gray-200 p-6 rounded-xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Bookings Over Time</h2>
        {chartData.length === 0 ? (
          <p className="text-gray-500 text-sm">No data to show.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-xl shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">🕒 Recent Bookings</h2>
          <Link
            to="/my-bookings"
            className="text-blue-600 hover:underline font-medium"
          >
            View All
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent bookings found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {recentBookings.map((booking) => (
              <li key={booking.id} className="py-4">
                <p className="font-medium text-gray-800">
                  {booking.vehicleName || "Unknown Vehicle"}
                </p>
                <p className="text-sm text-gray-500">
                  {booking.userName || booking.userEmail || "Unknown User"} •{" "}
                  {timeAgo(booking.createdAt)}
                </p>
                <span
                  className={`text-xs mt-1 inline-block px-2 py-1 rounded ${statusStyle(
                    booking.status
                  )}`}
                >
                  {booking.status
                    ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
                    : "Unknown"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

