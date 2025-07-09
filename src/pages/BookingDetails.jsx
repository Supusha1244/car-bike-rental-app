import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(null);
  const [promoMessage, setPromoMessage] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      const bookingRef = doc(db, "bookings", id);
      const bookingSnap = await getDoc(bookingRef);
      if (bookingSnap.exists()) {
        const bookingData = bookingSnap.data();
        setBooking({ id: bookingSnap.id, ...bookingData });

        const vehicleSnap = await getDoc(doc(db, "vehicles", bookingData.vehicleId));
        if (vehicleSnap.exists()) {
          setVehicle(vehicleSnap.data());
        }
      }
    };
    fetchBooking();
  }, [id]);

  const handleApplyPromo = () => {
    const validCodes = {
      "FIRST15": 0.15,
      "WEEKEND200": 200,
      "FREEDOM300": 300,
    };
    const code = promoCode.trim().toUpperCase();
    if (validCodes[code]) {
      const discountValue = validCodes[code];
      setDiscount(discountValue);
      setFinalTotal(booking.total - discountValue);
      setPromoMessage(`✓ Promo code applied! ₹${discountValue} discount`);
    } else {
      setDiscount(0);
      setFinalTotal(booking.total);
      setPromoMessage("✗ Invalid promo code");
    }
  };

  const handleCancelBooking = async () => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      await updateDoc(doc(db, "bookings", id), {
        status: "cancelled",
      });

      alert("Booking cancelled successfully!");
      navigate("/");
    } catch (err) {
      console.error("Cancel failed", err);
      alert("Failed to cancel booking. Please try again.");
    }
  };


  if (!booking || !vehicle) return <div className="p-6">Loading booking details...</div>;

  const bookingDate = booking.createdAt?.toDate().toLocaleDateString("en-IN");
  const calculatedTotal = finalTotal ?? booking.total;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-blue-900">Booking Confirmation</h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="relative">
          <img src={vehicle.image} alt={vehicle.name} className="w-full h-64 object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
            <h2 className="text-2xl font-bold text-white">{vehicle.name}</h2>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-4">{vehicle.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-600 text-sm">
            <p>★ 4.8 (120 reviews)</p>
            <p>Available Now</p>
            <p>Full Insurance</p>
            <p>24/7 Support</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl px-6 py-4 mb-6 border-l-4 border-blue-500">
        <h3 className="text-xl font-semibold mb-4">Booking Information</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
          <p><strong>Booking ID:</strong> {booking.id}</p>
          <p><strong>Booking Date:</strong> {bookingDate}</p>
          <p><strong>Duration:</strong> {booking.days} day(s)</p>
          <p><strong>Pickup Location:</strong> {booking.pickupLocation}</p>
          <p><strong>Drop Location:</strong> {booking.dropLocation}</p>
          <p><strong>Pickup Time:</strong> {booking.pickupTime}</p>
          <p><strong>Drop Time:</strong> {booking.dropTime}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`font-medium ${booking.status === "cancelled" ? "text-red-600" : "text-green-600"}`}>
              {booking.status || "confirmed"}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl px-6 py-4 mb-6">
        <h3 className="text-xl font-semibold mb-4">Pricing Breakdown</h3>
        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between"><span>Base Rate ({booking.days} days)</span><span>₹{vehicle.pricePerDay * booking.days}</span></div>
          <div className="flex justify-between"><span>Taxes & Fees</span><span>Included</span></div>
        </div>
        <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-blue-900 text-lg">
          <span>Total Amount</span>
          <span>₹{calculatedTotal}</span>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl px-6 py-4 mb-6">
        <h4 className="font-medium text-blue-800 mb-2">Apply Promo Code</h4>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter promo code"
            className="flex-1 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleApplyPromo}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Apply
          </button>
        </div>
        {promoMessage && (
          <p className={`mt-2 text-sm font-medium ${promoMessage.includes("✓") ? "text-green-600" : "text-red-600"}`}>
            {promoMessage}
          </p>
        )}
      </div>

      <div className="bg-white rounded-xl px-6 py-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Payment Information</h3>
          <button className="text-blue-600 font-medium text-sm">Change Payment</button>
        </div>
        <div className="flex items-center">
          <div className="bg-gray-100 rounded-lg p-3 mr-4">
            <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4a2 2 0 012-2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v5h12V4H6zm0 7v2h5v-2H6zm7 0v2h5v-2h-5z" />
            </svg>
          </div>
          <div>
            <p className="font-medium">Visa ending in 4242</p>
            <p className="text-gray-600 text-sm">Expires 05/25</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">Your payment of ₹{calculatedTotal} will be processed at pickup.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
  onClick={async () => {
    try {
      await updateDoc(doc(db, "bookings", id), {
        status: "confirmed",
      });
      alert("✅ Booking confirmed!");
      navigate("/my-bookings", { state: { confirmed: true } });
    } catch (error) {
      console.error("Booking confirmation failed:", error);
      alert("❌ Failed to confirm booking.");
    }
  }}
  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center"
>
  Confirm Booking
</button>

        <button
          onClick={handleCancelBooking}
          className="flex-1 bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium flex items-center justify-center"
        >
          Cancel Booking
        </button>
      </div>

      <div className="text-center mt-8 text-sm text-gray-500">
        Need help? Contact our <a href="#" className="text-blue-600 hover:underline">customer support</a>
      </div>
    </div>
  );
}
