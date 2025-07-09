import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export default function AddVehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    type: "car",
    pricePerDay: "",
    image: "",
    description: "",
  });

  const fetchVehicles = async () => {
    const snapshot = await getDocs(collection(db, "vehicles"));
    setVehicles(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const openAddModal = () => {
    setForm({ name: "", type: "car", pricePerDay: "", image: "", description: "" });
    setEditMode(false);
    setModalOpen(true);
  };

  const openEditModal = (vehicle) => {
    setForm(vehicle);
    setEditMode(true);
    setCurrentId(vehicle.id);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateDoc(doc(db, "vehicles", currentId), form);
        alert("Vehicle updated!");
      } else {
        await addDoc(collection(db, "vehicles"), {
          ...form,
          createdAt: Timestamp.now(),
        });
        alert("Vehicle added!");
      }
      setModalOpen(false);
      fetchVehicles();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      await deleteDoc(doc(db, "vehicles", id));
      fetchVehicles();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Vehicle Management</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((v) => (
          <div key={v.id} className="bg-white rounded shadow p-4">
            <img src={v.image} alt={v.name} className="w-full h-48 object-cover mb-3" />
            <h2 className="text-xl font-semibold">{v.name}</h2>
            <p className="text-gray-600 capitalize">{v.type}</p>
            <p className="text-gray-700">{v.description}</p>
            <p className="text-blue-600 font-bold mt-2">₹{v.pricePerDay}/day</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openEditModal(v)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(v.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded p-6 w-full max-w-md">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">
                {editMode ? "Edit Vehicle" : "Add New Vehicle"}
              </h2>
              <button onClick={() => setModalOpen(false)}>✖️</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Vehicle Name"
                className="w-full border p-2 rounded"
              />
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="suv">SUV</option>
                <option value="luxury">Luxury</option>
              </select>
              <input
                name="pricePerDay"
                type="number"
                value={form.pricePerDay}
                onChange={handleChange}
                required
                placeholder="Price Per Day"
                className="w-full border p-2 rounded"
              />
              <input
                name="imageUrl"
                value={form.image}
                onChange={handleChange}
                required
                placeholder="Image URL"
                className="w-full border p-2 rounded"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                placeholder="Description"
                className="w-full border p-2 rounded"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {editMode ? "Update Vehicle" : "Add Vehicle"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

