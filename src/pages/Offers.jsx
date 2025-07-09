import React from "react";

const offers = [
  {
    id: 1,
    title: "🚗 Get 15% Off Your First Ride!",
    description: "Use the promo code below during checkout and enjoy a 15% discount.",
    code: "FIRST15",
    validTill: "31 July 2025",
  },
  {
    id: 2,
    title: "🏍️ Weekend Special - ₹200 Off!",
    description: "Book for Saturday or Sunday and get ₹200 off.",
    code: "WEEKEND200",
    validTill: "30 August 2025",
  },
  {
    id: 3,
    title: "🎉 Independence Day Offer - Flat ₹300 Off",
    description: "Celebrate freedom with flat ₹300 off on any vehicle booking.",
    code: "FREEDOM300",
    validTill: "15 August 2025",
  },
];

export default function Offers() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">🔥 Current Offers</h1>
      <div className="space-y-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">{offer.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
            <div className="mt-3 flex items-center gap-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-mono">
                {offer.code}
              </span>
              <span className="text-xs text-gray-500">Valid till {offer.validTill}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
