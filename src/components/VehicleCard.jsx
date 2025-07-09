import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function VehicleCard({ vehicle, id }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const toggleFavorite = (e) => {
    e.preventDefault(); 
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - fullStars - (half ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => <i key={`f${i}`} className="fas fa-star text-yellow-400"></i>)}
        {half && <i className="fas fa-star-half-alt text-yellow-400"></i>}
        {[...Array(empty)].map((_, i) => <i key={`e${i}`} className="far fa-star text-gray-300"></i>)}
      </>
    );
  };

  return (
    <Link to={`/vehicle/${id}`}>
      <div className="card-container bg-white shadow-lg rounded-xl overflow-hidden w-80 relative transition-transform hover:translate-y-[-5px]">
        <div className="relative">
          <img src={vehicle.image} alt={vehicle.name} className="w-full h-48 object-cover" />

          {vehicle.featured && (
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold animate-pulse">
              FEATURED
            </div>
          )}

          {vehicle.discount && (
            <div className="absolute top-12 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              {vehicle.discount}% OFF
            </div>
          )}

          <button
            onClick={toggleFavorite}
            className={`favorite-btn absolute top-3 right-3 w-9 h-9 rounded-full flex justify-center items-center border-none ${
              isFavorite ? "bg-yellow-100 text-yellow-500" : "bg-white text-gray-400"
            }`}
          >
            <i className="fas fa-heart"></i>
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold">{vehicle.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{vehicle.description}</p>

          <div className="mt-2 flex items-center">
            <div className="mr-2">{renderStars(vehicle.rating || 4)}</div>
            <span className="text-sm text-gray-500">({vehicle.reviews || 0} reviews)</span>
          </div>

          <div className="mt-2 text-sm text-gray-500">Type: {vehicle.type}</div>

          <div className="mt-2 flex justify-between items-center">
            <div className="text-green-700 font-bold text-lg">
              ₹{vehicle.pricePerDay}
              <span className="text-gray-500 text-sm font-normal">/day</span>
            </div>
            {vehicle.discount && (
              <div className="text-sm text-gray-400 line-through">
                ₹{Math.round((vehicle.pricePerDay * 100) / (100 - vehicle.discount))}
              </div>
            )}
          </div>

          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
            Rent Now
          </button>
        </div>
      </div>
    </Link>
  );
}

