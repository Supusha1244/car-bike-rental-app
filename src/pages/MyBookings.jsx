import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function MyBookings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formInputs, setFormInputs] = useState({});

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "bookings"),
      where("userEmail", "==", user.email),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const bookingsWithVehicleData = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const booking = { id: docSnap.id, ...docSnap.data() };
          const vehicleDetails = await fetchVehicleDetails(booking.vehicleId);
          return {
            ...booking,
            vehicleImage: vehicleDetails?.image || "",
            vehicleDesc: vehicleDetails?.description || "",
          };
        })
      );

      setBookings(bookingsWithVehicleData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (location.state?.cancelled) {
      alert("✅ Booking cancelled successfully!");
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    if (location.state?.confirmed) {
      alert("✅ Booking confirmed successfully!");
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const fetchVehicleDetails = async (vehicleId) => {
    try {
      const docRef = doc(db, "vehicles", vehicleId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      return null;
    }
  };

  const handleInputChange = (bookingId, field, value) => {
    setFormInputs((prev) => ({
      ...prev,
      [bookingId]: {
        ...prev[bookingId],
        [field]: value,
      },
    }));
  };

  const handleConfirm = async (bookingId) => {
    const inputs = formInputs[bookingId];
    if (!inputs?.pickupLocation || !inputs?.dropLocation) {
      alert("❌ Please fill all fields");
      return;
    }

    try {
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, {
        ...inputs,
      });
      navigate(`/booking/${bookingId}`);
    } catch (error) {
      console.error("Failed to update:", error);
      alert("❌ Update failed");
    }
  };

  const handleDeleteBooking = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking permanently?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "bookings", id));
      alert("Booking deleted successfully.");
      navigate("/my-bookings");
    } catch (error) {
      console.error("Failed to delete booking", error);
      alert("Error deleting booking.");
    }
  };

  if (!user)
    return <div className="p-6">Please log in to view your bookings.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const input = formInputs[booking.id] || {};

            return (
              <div
                key={booking.id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4"
              >
                <div className="md:w-1/3 w-full">
                  <img
                    src={booking.vehicleImage}
                    alt={booking.vehicleName}
                    className="w-full h-60 object-cover rounded-md"
                  />
                  <button
                    onClick={handleDeleteBooking}
                    className="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-semibold shadow mt-2"
                  >
                    🗑Delete
                  </button>
                </div>

                <div className="md:w-2/3 w-full flex flex-col justify-between">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">
                      {booking.vehicleName}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {booking.vehicleDesc}
                    </p>
                    <p className="text-sm text-gray-600">
                      Booked for {booking.days} day(s)
                    </p>
                    <p className="text-green-600 font-bold">
                      ₹{booking.total} Total
                    </p>
                    <p className="text-xs text-gray-400">
                      {booking.createdAt?.toDate().toLocaleString()}
                    </p>

                    <p
                      className={`text-sm font-semibold ${
                        booking.status === "confirmed"
                          ? "text-green-600"
                          : booking.status === "cancelled"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      Status: {booking.status || "pending"}
                    </p>
                  </div>

                  {booking.status !== "confirmed" && (
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-600">
                            Pick-up location
                          </label>
                          <input
                            type="text"
                            value={input.pickupLocation || ""}
                            onChange={(e) =>
                              handleInputChange(
                                booking.id,
                                "pickupLocation",
                                e.target.value
                              )
                            }
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-600">
                            Drop-off location
                          </label>
                          <input
                            type="text"
                            value={input.dropLocation || ""}
                            onChange={(e) =>
                              handleInputChange(
                                booking.id,
                                "dropLocation",
                                e.target.value
                              )
                            }
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-600">
                            Pick-up time
                          </label>
                          <input
                            type="time"
                            value={input.pickupTime || ""}
                            onChange={(e) =>
                              handleInputChange(
                                booking.id,
                                "pickupTime",
                                e.target.value
                              )
                            }
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-600">
                            Drop-off time
                          </label>
                          <input
                            type="time"
                            value={input.dropTime || ""}
                            onChange={(e) =>
                              handleInputChange(
                                booking.id,
                                "dropTime",
                                e.target.value
                              )
                            }
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => handleConfirm(booking.id)}
                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-semibold"
                      >
                        Confirm Location
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
