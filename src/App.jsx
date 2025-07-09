import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VehicleList from "./pages/VehicleList";
import VehicleDetails from "./pages/VehicleDetails";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext"; 
import AddVehicle from "./pages/AddVehicle";
import Support from "./pages/Support";
import About from "./pages/About";
import BookingDetails from './pages/BookingDetails';
import Offers from "./pages/Offers";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <AuthProvider> 
      <Router>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <TopNavbar />
            <main className="flex-1 overflow-y-auto px-4 py-6 bg-gray-100">
              <Routes>
                <Route path="/" element={<VehicleList />} />
                <Route path="/vehicle/:id" element={<VehicleDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
                <Route path="/add-vehicle" element={<ProtectedRoute><AddVehicle /></ProtectedRoute>} />
                <Route path="/support" element={<Support />} />
                <Route path="/about" element={<About />} />
                <Route path="/booking/:id" element={<BookingDetails />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


