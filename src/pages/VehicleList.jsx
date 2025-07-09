import React, { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      setError(""); // Reset error state
      try {
        const querySnapshot = await getDocs(collection(db, "vehicles"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVehicles(data);
      } catch (error) {
        setError("Error fetching vehicles. Please try again later.");
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles
    .filter((v) =>
      filter === "all" ? true : v.type.toLowerCase() === filter.toLowerCase()
    )
    .filter((v) => v.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === "price"
        ? parseInt(a.pricePerDay) - parseInt(b.pricePerDay)
        : 0
    );

  return (
    <div className="space-y-6 ml-2 sm:ml-4 md:ml-6 lg:ml-10 xl:ml-24 2xl:ml-16 p-4">
      {/* Header Section */}
      <header class="relative w-full text-center bg-blue-600 p-8 rounded-lg text-white">
        <div class="road absolute bottom-1/4 left-0 w-full h-1 bg-white opacity-30"></div>
        
        <svg viewBox="0 0 800 200" class="vehicles">
            <path d="M0 150 Q400 140 800 150" 
                  fill="none" 
                  stroke="#ffffff80" 
                  stroke-width="8" 
                  stroke-dasharray="20 30"
                  stroke-linecap="round">
                <animate attributeName="stroke-dashoffset" 
                         values="0;50;0" 
                         dur="3s" 
                         repeatCount="indefinite"/>
            </path>
            
            <g id="car" transform="translate(0,0)">
                <path d="M0 130 L30 110 L80 110 L120 130 L140 130 L140 150 L0 150 Z" 
                      fill="#ffffff" 
                      stroke="#1e40af" 
                      stroke-width="2">
                    <animateTransform attributeName="transform" 
                                      type="translate" 
                                      values="-150 0; 950 0; -150 0" 
                                      keyTimes="0; 0.7; 1" 
                                      dur="8s" 
                                      repeatCount="indefinite"/>
                </path>
                
                <polygon points="35,115 75,115 95,130 50,130" 
                         fill="#e0f2fe" 
                         stroke="#1e40af" 
                         stroke-width="1"/>
                
                <g id="car-front-wheel">
                    <circle cx="30" cy="150" r="15" fill="#1e40af"/>
                    <circle cx="30" cy="150" r="8" fill="#3b82f6"/>
                    <line x1="30" y1="135" x2="30" y2="165" stroke="#ffffff" stroke-width="3">
                        <animateTransform attributeName="transform" 
                                          type="rotate" 
                                          from="0 30 150" 
                                          to="360 30 150" 
                                          dur="1.6s" 
                                          repeatCount="indefinite"/>
                    </line>
                </g>
                
                <g id="car-rear-wheel">
                    <circle cx="110" cy="150" r="15" fill="#1e40af"/>
                    <circle cx="110" cy="150" r="8" fill="#3b82f6"/>
                    <line x1="110" y1="135" x2="110" y2="165" stroke="#ffffff" stroke-width="3">
                        <animateTransform attributeName="transform" 
                                          type="rotate" 
                                          from="0 110 150" 
                                          to="360 110 150" 
                                          dur="1.6s" 
                                          repeatCount="indefinite"/>
                    </line>
                </g>
            </g>
          
            <g id="bike" transform="translate(0,0)">
                <path d="M200 150 L220 130 L240 140 L260 130 L300 130 L290 140 L280 150" 
                      fill="none" 
                      stroke="#f43f5e" 
                      stroke-width="8" 
                      stroke-linecap="round"/>
                
                <path d="M240 130 L270 130 L265 140 L245 140 Z" 
                      fill="#f43f5e" 
                      stroke="#9f1239" 
                      stroke-width="1.5"/>
                
                <g id="bike-front-wheel">
                    <circle cx="220" cy="150" r="20" fill="#111827"/>
                    <circle cx="220" cy="150" r="12" fill="#4b5563"/>
                    <line x1="220" y1="130" x2="220" y2="170" stroke="#ffffff" stroke-width="4">
                        <animateTransform attributeName="transform" 
                                          type="rotate" 
                                          from="0 220 150" 
                                          to="360 220 150" 
                                          dur="1.2s" 
                                          repeatCount="indefinite"/>
                    </line>
                </g>
                
                <g id="bike-rear-wheel">
                    <circle cx="300" cy="150" r="20" fill="#111827"/>
                    <circle cx="300" cy="150" r="12" fill="#4b5563"/>
                    <line x1="300" y1="130" x2="300" y2="170" stroke="#ffffff" stroke-width="4">
                        <animateTransform attributeName="transform" 
                                          type="rotate" 
                                          from="0 300 150" 
                                          to="360 300 150" 
                                          dur="1.2s" 
                                          repeatCount="indefinite"/>
                    </line>
                </g>
                
                <animateTransform attributeName="transform" 
                                  type="translate" 
                                  values="-150 0; 950 0; -150 0" 
                                  keyTimes="0; 0.5; 1" 
                                  dur="6s" 
                                  begin="1s" 
                                  repeatCount="indefinite"/>
            </g>
            
            <text x="400" y="50" 
                  text-anchor="middle" 
                  fill="white" 
                  font-size="40" 
                  font-weight="bold"
                  letter-spacing="2px">
                <tspan x="400" dy="0">Find yOur perFect</tspan>
                <tspan x="400" dy="50" font-size="50" fill="#fecdd3">Ride fOr anY adVentuRe</tspan>
                <animate attributeName="opacity" 
                         values="0.8;1;0.8" 
                         dur="4s" 
                         repeatCount="indefinite"/>
            </text>
        </svg>
    </header>


      {/* Filter Section with Enhanced Hover Effects */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2 bg-white p-2 rounded-lg shadow-md">
          <button
            className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out 
              ${filter === "all" 
                ? "bg-blue-600 text-white shadow-md" 
                : "bg-white text-blue-600 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-0.5 border border-blue-100"}`}
            onClick={() => setFilter("all")}
          >
            All Vehicles
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out 
              ${filter === "car" 
                ? "bg-blue-600 text-white shadow-md" 
                : "bg-white text-blue-600 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-0.5 border border-blue-100"}`}
            onClick={() => setFilter("car")}
          >
            Cars
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out 
              ${filter === "bike" 
                ? "bg-blue-600 text-white shadow-md" 
                : "bg-white text-blue-600 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-0.5 border border-blue-100"}`}
            onClick={() => setFilter("bike")}
          >
            Bikes
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg w-60"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              ✖️
            </button>
          )}
        </div>

        <select
          onChange={(e) => setSort(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="default">Sort by</option>
          <option value="price">Price: Low to High</option>
        </select>
      </div>

      {/* Vehicle Cards Section */}
      {loading ? (
        <p>Loading vehicles...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {filteredVehicles.length === 0 ? (
            <p>No vehicles found</p>
          ) : (
            filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} id={vehicle.id} vehicle={vehicle} />
            ))
          )}
        </div>
      )}
    </div>
  );
}




