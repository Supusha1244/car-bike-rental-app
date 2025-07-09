import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const [pickupDate, setPickupDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [dropDate, setDropDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });

  const days = Math.max(1, Math.ceil((new Date(dropDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)));
  const total = vehicle ? vehicle.pricePerDay * days : 0;

  useEffect(() => {
    const fetchVehicle = async () => {
      const docRef = doc(db, "vehicles", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setVehicle(docSnap.data());
      } else {
        console.log("No such vehicle!");
      }
    };

    const fetchReviews = async () => {
      const q = query(collection(db, "reviews"), where("vehicleId", "==", id));
      const snapshot = await getDocs(q);
      const reviewsList = snapshot.docs.map(doc => doc.data());
      setReviews(reviewsList);
    };

    fetchVehicle();
    fetchReviews();
  }, [id]);

  const toggleFavorite = () => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleBooking = async () => {
    if (!user) {
      alert("Please login to book a vehicle.");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "bookings"), {
        userEmail: user.email,
        vehicleId: id,
        vehicleName: vehicle.name,
        pickupDate,
        dropDate,
        days,
        total,
        createdAt: serverTimestamp(),
      });
      alert("✅ Booking successful!");
      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking error:", error);
      alert("❌ Failed to book. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async () => {
    if (!reviewRating || !reviewComment) {
      alert("Please select a rating and write a comment.");
      return;
    }

    try {
      await addDoc(collection(db, "reviews"), {
        vehicleId: id,
        userEmail: user.email,
        rating: Number(reviewRating),
        comment: reviewComment,
        createdAt: serverTimestamp(),
      });
      alert("✅ Review submitted!");
      setReviewRating('');
      setReviewComment('');
          // 🔁 Fetch reviews again to update the list
    const q = query(collection(db, "reviews"), where("vehicleId", "==", id));
    const snapshot = await getDocs(q);
    const updatedReviews = snapshot.docs.map(doc => doc.data());
    setReviews(updatedReviews);  // 👈 updates UI immediately
    } catch (error) {
      console.error("Review error:", error);
      alert("❌ Failed to submit review.");
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let starsHTML = "";

    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i class="fas fa-star text-yellow-500"></i>';
    }
    if (hasHalfStar) {
      starsHTML += '<i class="fas fa-star-half-alt text-yellow-500"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i class="far fa-star text-gray-300"></i>';
    }

    return starsHTML;
  };

  if (!vehicle) return <div className="p-8 text-center text-lg">Loading vehicle details...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl overflow-hidden flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 bg-black/5 p-4 lg:p-6 flex flex-col items-center justify-start space-y-4">
          <img src={vehicle.image} alt={vehicle.name} className="w-full max-h-[500px] object-contain rounded-md" />
          <div className="flex items-center space-x-2 mt-4">
          </div>
          <button
            onClick={toggleFavorite}
            className={`text-sm font-semibold transition ${favorites.includes(id) ? "text-red-600" : "text-gray-600"} hover:scale-105`}
          >
            {favorites.includes(id) ? "❤️ Favorited" : "♡ Add to Favorites"}
          </button>
        </div>

        <div className="w-full lg:w-1/2 p-6 lg:p-10 space-y-5">
          <h2 className="text-3xl font-bold text-gray-800">{vehicle.name}</h2>
          <p className="text-gray-600 text-sm">{vehicle.description}</p>

          <div className="text-sm">
            <p className="text-gray-700">
              Type: <span className="font-semibold capitalize">{vehicle.type}</span>
            </p>
            <p className="text-green-700 font-bold mt-1 text-lg">₹{vehicle.pricePerDay}/day</p>
          </div>

          <div className="pt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
              <input
                type="date"
                value={pickupDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full border px-3 py-2 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Drop Date</label>
              <input
                type="date"
                value={dropDate}
                min={pickupDate}
                onChange={(e) => setDropDate(e.target.value)}
                className="w-full border px-3 py-2 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <p className="text-xl font-semibold text-gray-800 pt-2">
            Total Price: <span className="text-green-700">₹{total}</span> ({days} day{days > 1 ? "s" : ""})
          </p>

          <button
            onClick={handleBooking}
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 px-5 py-3 mt-6 text-white rounded-lg text-sm font-semibold transition-all ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? (
              "Booking..."
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H3" />
                </svg>
                Book Now
              </>
            )}
          </button>

        </div>
        
      </div>
      
          {user && (
            <div className="mt-10 space-y-3 border-t pt-6 bg-gray-300 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">Leave a Review </h3>
              <select
                value={reviewRating}
                onChange={(e) => setReviewRating(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Rating</option>
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                ))}
              </select>
              <textarea
                rows={3}
                placeholder="Write your review..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
              <button
                onClick={handleReviewSubmit}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm"
              >
                Submit Review
              </button>
            </div>
          )}

          {reviews.length > 0 && (
            <div className="mt-8 border-t pt-6 ">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">User Reviews</h3>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {reviews.map((rev, idx) => (
                  <div key={idx} className="bg-blue-200 p-4 rounded shadow">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-700">{rev.userEmail}</p>
                      <span className="text-yellow-500">{'★'.repeat(rev.rating)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
    </div>
  );
}
