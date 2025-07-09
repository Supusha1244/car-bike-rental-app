import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [vehicles, setVehicles] = useState([]);
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    const fetchFavoriteVehicles = async () => {
      if (favorites.length === 0) {
        setVehicles([]);
        return;
      }

      const snapshot = await getDocs(collection(db, "vehicles"));
      const allVehicles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const favVehicles = allVehicles.filter((v) => favorites.includes(v.id));
      setVehicles(favVehicles);
    };

    fetchFavoriteVehicles();
  }, [favorites]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">❤️ Your Favorites</h1>
      {vehicles.length === 0 ? (
        <p className="text-gray-600">No favorites added yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <Link
              to={`/vehicle/${vehicle.id}`}
              key={vehicle.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{vehicle.name}</h2>
                <p className="text-gray-600 text-sm">{vehicle.type}</p>
                <p className="text-green-700 font-bold">₹{vehicle.pricePerDay}/day</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
